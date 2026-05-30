import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Database Configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.DB_NAME || 'layanan_desa',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
};

let db;

// Connection with Retry logic
async function connectWithRetry() {
  let attempts = 10;
  while (attempts) {
    try {
      console.log(`Connecting to database at ${dbConfig.host}:${dbConfig.port}... (Attempts remaining: ${attempts})`);
      db = await mysql.createPool({
        ...dbConfig,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
      // Test connection
      await db.query('SELECT 1');
      console.log('Database connected successfully!');
      break;
    } catch (err) {
      console.error('Database connection failed:', err.message);
      attempts--;
      if (attempts === 0) {
        console.error('Could not connect to database. Exiting.');
        process.exit(1);
      }
      console.log('Retrying in 5 seconds...');
      await new Promise(res => setTimeout(res, 5000));
    }
  }
}

// Initial Connection
await connectWithRetry();

// --- API ROUTES ---

// 1. Get All Submissions (Admin Dashboard)
app.get('/api/pengajuan', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pengajuan ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// 2. Get Submission Status by Code
app.get('/api/pengajuan/:kode', async (req, res) => {
  const { kode } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM pengajuan WHERE kode_pengajuan = ?', [kode]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Nomor pengajuan tidak ditemukan' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching submission status:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// 3. Create a New Submission
app.post('/api/pengajuan', async (req, res) => {
  const { nama, nik, no_hp, jenis_layanan, alamat, keperluan } = req.body;

  if (!nama || !nik || !no_hp || !jenis_layanan || !alamat || !keperluan) {
    return res.status(400).json({ error: 'Semua field wajib diisi' });
  }

  try {
    // Generate sequential submission code: PGJ-YYYY-XXX
    const [rows] = await db.query('SELECT MAX(id) as maxId FROM pengajuan');
    const nextId = (rows[0].maxId || 0) + 1;
    const year = new Date().getFullYear();
    const kode_pengajuan = `PGJ-${year}-${String(nextId).padStart(3, '0')}`;

    const query = `
      INSERT INTO pengajuan (kode_pengajuan, nama, nik, no_hp, jenis_layanan, alamat, keperluan, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Diproses')
    `;
    const values = [kode_pengajuan, nama, nik, no_hp, jenis_layanan, alamat, keperluan];

    await db.query(query, values);
    
    res.status(201).json({ 
      message: 'Pengajuan berhasil dikirim', 
      kode_pengajuan 
    });
  } catch (error) {
    console.error('Error creating submission:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat memproses pengajuan' });
  }
});

// 4. Update Status (Approve/Reject)
app.put('/api/pengajuan/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Expects 'Setujui' or 'Ditolak' or 'Diproses'
  
  // Normalize client status mapping
  let dbStatus = status;
  if (status === 'Setujui') dbStatus = 'Setujui';
  else if (status === 'Tolak') dbStatus = 'Ditolak';

  if (!['Setujui', 'Ditolak', 'Diproses'].includes(dbStatus)) {
    return res.status(400).json({ error: 'Status tidak valid' });
  }

  try {
    const [result] = await db.query('UPDATE pengajuan SET status = ? WHERE id = ?', [dbStatus, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pengajuan tidak ditemukan' });
    }
    res.json({ message: `Status berhasil diubah menjadi ${dbStatus}` });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengupdate status' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
