import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Search, 
  PlusCircle, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  FileCheck, 
  ShieldCheck, 
  Globe, 
  Database,
  Building,
  ChevronRight,
  ClipboardCopy,
  Check
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  
  // Custom router state listener
  useEffect(() => {
    const handleRoute = () => {
      const path = window.location.pathname;
      if (path === '/admin') {
        setActiveTab('admin');
      } else if (path === '/pengajuan') {
        setActiveTab('pengajuan');
      } else if (path === '/status') {
        setActiveTab('cek-status');
      } else {
        setActiveTab('home');
      }
    };
    handleRoute();
    window.addEventListener('popstate', handleRoute);
    return () => window.removeEventListener('popstate', handleRoute);
  }, []);

  const navigateTo = (tab) => {
    setActiveTab(tab);
    const paths = {
      home: '/',
      pengajuan: '/pengajuan',
      'cek-status': '/status',
      admin: '/admin'
    };
    window.history.pushState({}, '', paths[tab]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand" onClick={() => navigateTo('home')}>
          <Building size={28} />
          <span>Desa Sukamakmur</span>
        </div>
        <ul className="nav-menu">
          <li>
            <button 
              className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => navigateTo('home')}
            >
              Home
            </button>
          </li>
          <li>
            <button 
              className={`nav-item ${activeTab === 'pengajuan' ? 'active' : ''}`}
              onClick={() => navigateTo('pengajuan')}
            >
              Form Pengajuan
            </button>
          </li>
          <li>
            <button 
              className={`nav-item ${activeTab === 'cek-status' ? 'active' : ''}`}
              onClick={() => navigateTo('cek-status')}
            >
              Cek Status
            </button>
          </li>
          <li>
            <button 
              className={`nav-item ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => navigateTo('admin')}
            >
              Dashboard Admin
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'home' && <HomeView navigateTo={navigateTo} />}
        {activeTab === 'pengajuan' && <FormView navigateTo={navigateTo} />}
        {activeTab === 'cek-status' && <StatusView />}
        {activeTab === 'admin' && <AdminView />}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <div className="footer-logo">
              <Building size={20} />
              <span>Desa Sukamakmur</span>
            </div>
            <p className="footer-desc">
              Pelayanan publik desa yang lebih dekat, transparan, dan responsif. Digitalisasi pelayanan administratif desa untuk masyarakat yang lebih sejahtera.
            </p>
          </div>
          <div>
            <h4 className="footer-title">SDGs yang Didukung</h4>
            <ul className="footer-links">
              <li className="footer-link-item">🚀 SDG 9: Digitalisasi Layanan Desa</li>
              <li className="footer-link-item">🏡 SDG 11: Aksesibilitas Layanan Publik</li>
              <li className="footer-link-item">⚖️ SDG 16: Transparansi & Akuntabilitas</li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Kontak</h4>
            <div className="contact-item">
              <MapPin size={16} className="contact-icon" />
              <span className="contact-text">Jl. Raya Sukamakmur No. 45, Kec. Harapan, Jawa Barat</span>
            </div>
            <div className="contact-item">
              <Phone size={16} className="contact-icon" />
              <span className="contact-text">+62 812-3456-7890</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Pemerintah Desa Sukamakmur. Hak Cipta Dilindungi.</p>
          <p>Dibuat untuk Infrastruktur Cloud & Kubernetes</p>
        </div>
      </footer>
    </div>
  );
}

// ==================== HOME VIEW ====================
function HomeView({ navigateTo }) {
  return (
    <div>
      {/* Hero Banner */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-tag">
            <Globe size={14} />
            <span>Digitalisasi Layanan Desa</span>
          </div>
          <h1 className="hero-title">Sistem Pelayanan Publik Desa Sukamakmur</h1>
          <p className="hero-description">
            Ajukan layanan administrasi desa seperti Surat Keterangan Usaha, Domisili, dan pengaduan masyarakat secara online dengan cepat, transparan, dan tanpa antre.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigateTo('pengajuan')}>
              Ajukan Layanan <ArrowRight size={16} />
            </button>
            <button className="btn btn-secondary" onClick={() => navigateTo('cek-status')}>
              Cek Status Pengajuan
            </button>
          </div>
        </div>
        <div className="hero-image-container">
          <div className="hero-illustration">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', fill: '#4f46e5' }}>
              <path d="M43.3,-62C55.4,-51.7,64.2,-37.8,69,-22.4C73.8,-7,74.5,9.9,69.5,24.8C64.6,39.6,53.9,52.4,40.4,61C26.9,69.7,10.6,74.2,-4.7,80.7C-20,87.2,-34.2,95.7,-46.8,91.8C-59.5,88,-70.5,71.8,-77.2,54.7C-83.8,37.6,-86.1,19.6,-85,-2.1C-84,-23.7,-79.6,-49,-66.2,-58.5C-52.9,-68.1,-30.7,-61.8,-11.2,-61.6C8.3,-61.5,27.9,-67.4,43.3,-62Z" transform="translate(100 100) scale(0.9)" opacity="0.15" />
              <path d="M45.5,-59.4C58.3,-50.2,67.8,-35.1,71.2,-19.1C74.6,-3,71.8,13.9,64.9,28.2C58,42.5,46.9,54.2,33.3,61.8C19.7,69.3,3.7,72.7,-12,71C-27.7,69.3,-43.1,62.5,-53.4,51.8C-63.7,41.1,-69,26.5,-71.4,11.3C-73.8,-3.9,-73.3,-19.7,-66.6,-32.8C-59.9,-45.8,-47,-56.1,-33.5,-64.8C-20,-73.4,-5.9,-80.4,6.4,-77.4C18.7,-74.4,32.7,-68.6,45.5,-59.4Z" transform="translate(100 100) scale(0.7)" opacity="0.2" />
            </svg>
          </div>
        </div>
      </div>

      {/* SDGs Alignments */}
      <h2 className="info-section-title">
        <ShieldCheck size={24} /> SDGs Desa (Sustainable Development Goals)
      </h2>
      <div className="grid-3-col">
        <div className="card">
          <div className="card-icon-wrapper" style={{ backgroundColor: '#fce7f3', color: '#be185d' }}>
            <Database size={24} />
          </div>
          <h3 className="card-title">SDG 9: Industri, Inovasi, & Infrastruktur</h3>
          <p className="card-desc">
            Digitalisasi infrastruktur pelayanan desa. Mengurangi penggunaan kertas (paperless) serta meningkatkan efisiensi waktu kerja birokrasi pemerintahan desa.
          </p>
          <span className="sdg-badge sdg-9">Inovasi Digital</span>
        </div>
        <div className="card">
          <div className="card-icon-wrapper" style={{ backgroundColor: '#ffedd5', color: '#c2410c' }}>
            <Building size={24} />
          </div>
          <h3 className="card-title">SDG 11: Kota & Pemukiman yang Berkelanjutan</h3>
          <p className="card-desc">
            Memberikan akses layanan publik yang inklusif dan mudah dijangkau oleh seluruh warga desa tanpa batasan jarak, langsung dari ponsel masing-masing.
          </p>
          <span className="sdg-badge sdg-11">Akses Warga</span>
        </div>
        <div className="card">
          <div className="card-icon-wrapper" style={{ backgroundColor: '#dbeafe', color: '#1d4ed8' }}>
            <FileCheck size={24} />
          </div>
          <h3 className="card-title">SDG 16: Perdamaian, Keadilan & Kelembagaan</h3>
          <p className="card-desc">
            Menyediakan kelembagaan desa yang transparan melalui sistem pelacakan status pengajuan. Warga dapat melihat proses pengajuan secara riil tanpa pungli.
          </p>
          <span className="sdg-badge sdg-16">Transparansi</span>
        </div>
      </div>

      {/* Berita Desa */}
      <h2 className="info-section-title">
        <FileText size={24} /> Berita & Kegiatan Desa
      </h2>
      <div className="grid-3-col">
        <div className="card news-card">
          <span className="news-date">30 Mei 2026</span>
          <h3 className="card-title">Sistem Publikasi Layanan Online Diluncurkan</h3>
          <p className="card-desc">
            Pemerintah Desa Sukamakmur merilis platform layanan publik online untuk memudahkan pengurusan berkas administrasi warga demi mendukung transisi desa digital.
          </p>
          <div>
            <span className="sdg-badge sdg-9">SDG 9</span>
          </div>
        </div>
        <div className="card news-card">
          <span className="news-date">28 Mei 2026</span>
          <h3 className="card-title">Peningkatan Jaringan Internet untuk Balai RW</h3>
          <p className="card-desc">
            Untuk menyukseskan program layanan publik digital, pemerintah desa memasang akses Wi-Fi gratis di setiap balai RW agar warga yang kesulitan kuota tetap terlayani.
          </p>
          <div>
            <span className="sdg-badge sdg-11">SDG 11</span>
          </div>
        </div>
        <div className="card news-card">
          <span className="news-date">25 Mei 2026</span>
          <h3 className="card-title">Penyusunan Rencana Kerja Desa secara Transparan</h3>
          <p className="card-desc">
            Warga Sukamakmur menghadiri musyawarah rencana kerja pembangunan desa secara terbuka. Hasil musyawarah kini dapat diakses bebas oleh masyarakat desa.
          </p>
          <div>
            <span className="sdg-badge sdg-16">SDG 16</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== FORM VIEW ====================
function FormView({ navigateTo }) {
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    no_hp: '',
    jenis_layanan: 'Surat Domisili',
    alamat: '',
    keperluan: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // NIK validation
    if (formData.nik.length < 16 || isNaN(formData.nik)) {
      setError('NIK harus berisi 16 digit angka');
      return;
    }
    // Phone validation
    if (isNaN(formData.no_hp)) {
      setError('Nomor HP harus berupa angka');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/pengajuan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Gagal mengirim pengajuan');
      }

      setSuccessData(data);
      setFormData({
        nama: '',
        nik: '',
        no_hp: '',
        jenis_layanan: 'Surat Domisili',
        alamat: '',
        keperluan: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (successData?.kode_pengajuan) {
      navigator.clipboard.writeText(successData.kode_pengajuan);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (successData) {
    return (
      <div className="form-container">
        <div className="success-card">
          <div className="success-icon-wrapper">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="section-title" style={{ color: 'var(--success)' }}>Pengajuan Dikirim!</h2>
          <p className="section-subtitle">Simpan nomor pengajuan berikut untuk memantau status berkas Anda.</p>
          
          <div className="code-display-box">
            <p className="code-label">Nomor Pengajuan</p>
            <p className="code-value">{successData.kode_pengajuan}</p>
            <button 
              className="btn btn-secondary" 
              onClick={copyToClipboard}
              style={{ marginTop: '0.75rem', padding: '0.4rem 1rem', fontSize: '0.85rem' }}
            >
              {copied ? <><Check size={14} style={{ color: 'var(--success)' }} /> Tersalin</> : <><ClipboardCopy size={14} /> Salin Kode</>}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => navigateTo('cek-status')}>
              Cek Status Sekarang
            </button>
            <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setSuccessData(null)}>
              Ajukan Surat Lain
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="section-header">
        <h2 className="section-title">Form Pengajuan Layanan</h2>
        <p className="section-subtitle">Lengkapi formulir di bawah ini dengan data asli Anda.</p>
      </div>

      {error && (
        <div style={{ 
          backgroundColor: 'var(--danger-light)', 
          color: 'var(--danger-dark)', 
          padding: '1rem', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '1.5rem',
          fontWeight: 600,
          border: '1px solid rgba(239, 68, 68, 0.2)',
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center'
        }}>
          <XCircle size={18} /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nama Lengkap</label>
          <input 
            type="text" 
            name="nama"
            className="form-input" 
            placeholder="Masukkan nama lengkap sesuai KTP"
            value={formData.nama}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">NIK (Nomor Induk Kependudukan)</label>
          <input 
            type="text" 
            name="nik"
            className="form-input" 
            placeholder="Masukkan 16 digit NIK Anda"
            maxLength={16}
            value={formData.nik}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Nomor HP / WhatsApp</label>
          <input 
            type="text" 
            name="no_hp"
            className="form-input" 
            placeholder="Contoh: 081234567890"
            value={formData.no_hp}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Jenis Layanan</label>
          <select 
            name="jenis_layanan"
            className="form-input" 
            value={formData.jenis_layanan}
            onChange={handleChange}
            required
          >
            <option value="Surat Domisili">Surat Domisili</option>
            <option value="Surat Keterangan Usaha">Surat Keterangan Usaha</option>
            <option value="Surat Tidak Mampu">Surat Tidak Mampu</option>
            <option value="Pengaduan Masyarakat">Pengaduan Masyarakat</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Alamat Lengkap</label>
          <textarea 
            name="alamat"
            className="form-input" 
            placeholder="Masukkan alamat RT / RW dan nama dusun"
            value={formData.alamat}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Keperluan Pengajuan</label>
          <textarea 
            name="keperluan"
            className="form-input" 
            placeholder="Tulis alasan atau kegunaan pengajuan surat ini secara detail"
            value={formData.keperluan}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Mengirim...' : 'Kirim Pengajuan'}
          </button>
        </div>
      </form>
    </div>
  );
}

// ==================== STATUS CHECK VIEW ====================
function StatusView() {
  const [searchKode, setSearchKode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchKode.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`${API_BASE}/pengajuan/${searchKode.trim().toUpperCase()}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Nomor pengajuan tidak ditemukan');
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Setujui':
        return <span className="badge badge-success"><CheckCircle2 size={14} /> Disetujui</span>;
      case 'Ditolak':
        return <span className="badge badge-danger"><XCircle size={14} /> Ditolak</span>;
      default:
        return <span className="badge badge-warning"><Clock size={14} /> Diproses</span>;
    }
  };

  return (
    <div>
      <div className="status-search-card">
        <div className="section-header">
          <h2 className="section-title">Cek Status Pengajuan</h2>
          <p className="section-subtitle">Masukkan kode pengajuan (contoh: PGJ-2026-001) untuk memeriksa status berkas Anda.</p>
        </div>

        <form onSubmit={handleSearch}>
          <div className="search-input-group">
            <input 
              type="text" 
              className="form-input" 
              placeholder="Masukkan Kode Pengajuan"
              value={searchKode}
              onChange={(e) => setSearchKode(e.target.value)}
              style={{ textTransform: 'uppercase' }}
              required
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Search size={18} /> {loading ? 'Mencari...' : 'Cari'}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="status-result-card" style={{ textAlign: 'center', borderColor: 'var(--danger-light)' }}>
          <div className="success-icon-wrapper" style={{ backgroundColor: 'var(--danger-light)', color: 'var(--danger)' }}>
            <XCircle size={32} />
          </div>
          <h3 style={{ marginBottom: '0.5rem', fontWeight: 800 }}>Pencarian Gagal</h3>
          <p style={{ color: 'var(--text-secondary)' }}>{error}</p>
        </div>
      )}

      {result && (
        <div className="status-result-card">
          <div className="result-header">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>KODE PENGAJUAN</span>
              <span className="result-title">{result.kode_pengajuan}</span>
            </div>
            {getStatusBadge(result.status)}
          </div>

          <div className="result-detail-list">
            <div className="detail-row">
              <span className="detail-label">Nama Pemohon</span>
              <span className="detail-val">{result.nama}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">NIK</span>
              <span className="detail-val">{result.nik.replace(/(?<=.{4}).(?=.{4})/g, '*')}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Jenis Layanan</span>
              <span className="detail-val">{result.jenis_layanan}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Alamat</span>
              <span className="detail-val" style={{ fontWeight: 'normal' }}>{result.alamat}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Keperluan</span>
              <span className="detail-val" style={{ fontWeight: 'normal' }}>{result.keperluan}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Tanggal Pengajuan</span>
              <span className="detail-val" style={{ fontWeight: 'normal' }}>
                {new Date(result.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })} WIB
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== ADMIN VIEW ====================
function AdminView() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/pengajuan`);
      const data = await response.json();
      if (response.ok) {
        setSubmissions(data);
      }
    } catch (err) {
      console.error('Error fetching submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleAction = async (id, status) => {
    setActionLoadingId(id);
    try {
      const response = await fetch(`${API_BASE}/pengajuan/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        // Refresh local items
        setSubmissions(prev => 
          prev.map(sub => sub.id === id ? { ...sub, status: status === 'Setujui' ? 'Setujui' : 'Ditolak' } : sub)
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setActionLoadingId(null);
    }
  };

  // Stats computation
  const total = submissions.length;
  const pending = submissions.filter(s => s.status === 'Diproses').length;
  const approved = submissions.filter(s => s.status === 'Setujui').length;
  const rejected = submissions.filter(s => s.status === 'Ditolak').length;

  const filteredSubmissions = submissions.filter(sub => 
    sub.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sub.kode_pengajuan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.jenis_layanan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Dashboard Admin Desa</h2>
        <p className="section-subtitle">Kelola dan review berkas permohonan layanan publik warga secara langsung.</p>
      </div>

      {/* Summary Stats Grid */}
      <div className="admin-summary-grid">
        <div className="summary-card all">
          <div className="summary-icon-box">
            <FileText size={24} />
          </div>
          <div className="summary-details">
            <span className="summary-count">{loading ? '...' : total}</span>
            <span className="summary-label">Total Masuk</span>
          </div>
        </div>
        <div className="summary-card pending">
          <div className="summary-icon-box">
            <Clock size={24} />
          </div>
          <div className="summary-details">
            <span className="summary-count">{loading ? '...' : pending}</span>
            <span className="summary-label">Diproses</span>
          </div>
        </div>
        <div className="summary-card approved">
          <div className="summary-icon-box">
            <CheckCircle2 size={24} />
          </div>
          <div className="summary-details">
            <span className="summary-count">{loading ? '...' : approved}</span>
            <span className="summary-label">Disetujui</span>
          </div>
        </div>
        <div className="summary-card rejected">
          <div className="summary-icon-box">
            <XCircle size={24} />
          </div>
          <div className="summary-details">
            <span className="summary-count">{loading ? '...' : rejected}</span>
            <span className="summary-label">Ditolak</span>
          </div>
        </div>
      </div>

      {/* Submissions Table Card */}
      <div className="table-card">
        <div className="table-header">
          <h3 className="table-title">Daftar Pengajuan Surat</h3>
          <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Cari nama atau kode..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.5rem', borderRadius: '20px' }}
            />
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          </div>
        </div>

        <div className="table-responsive">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
              Memuat data pengajuan...
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="empty-state">
              <FileText className="empty-state-icon" />
              <p>Tidak ada data pengajuan surat ditemukan.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>Nama Pemohon</th>
                  <th>Layanan</th>
                  <th>Alamat & Keperluan</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((sub) => (
                  <tr key={sub.id}>
                    <td style={{ fontWeight: 700, fontFamily: 'monospace' }}>{sub.kode_pengajuan}</td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{sub.nama}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>NIK: {sub.nik}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>HP: {sub.no_hp}</div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{sub.jenis_layanan}</td>
                    <td style={{ maxWidth: '300px' }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                        <strong>Alamat:</strong> {sub.alamat}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <strong>Keperluan:</strong> {sub.keperluan}
                      </div>
                    </td>
                    <td>
                      {sub.status === 'Setujui' && (
                        <span className="badge badge-success"><CheckCircle2 size={12} /> Disetujui</span>
                      )}
                      {sub.status === 'Ditolak' && (
                        <span className="badge badge-danger"><XCircle size={12} /> Ditolak</span>
                      )}
                      {sub.status === 'Diproses' && (
                        <span className="badge badge-warning"><Clock size={12} /> Diproses</span>
                      )}
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button 
                          className="btn btn-action btn-action-approve"
                          onClick={() => handleAction(sub.id, 'Setujui')}
                          disabled={sub.status !== 'Diproses' || actionLoadingId === sub.id}
                        >
                          Setujui
                        </button>
                        <button 
                          className="btn btn-action btn-action-reject"
                          onClick={() => handleAction(sub.id, 'Tolak')}
                          disabled={sub.status !== 'Diproses' || actionLoadingId === sub.id}
                        >
                          Tolak
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
