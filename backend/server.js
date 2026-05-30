const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let dataPengajuan = [];

app.get('/', (req, res) => {
    res.send('Backend Kubernetes Running');
});

app.get('/pengajuan', (req, res) => {
    res.json(dataPengajuan);
});

app.post('/pengajuan', (req, res) => {
    dataPengajuan.push(req.body);
    res.json({
        message: 'Pengajuan berhasil'
    });
});

app.listen(5000, '0.0.0.0', () => {
    console.log('Server running on port 5000');
});
