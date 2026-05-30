CREATE DATABASE IF NOT EXISTS layanan_desa;
USE layanan_desa;

CREATE TABLE IF NOT EXISTS pengajuan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kode_pengajuan VARCHAR(30) UNIQUE,
    nama VARCHAR(100),
    nik VARCHAR(20),
    no_hp VARCHAR(20),
    jenis_layanan VARCHAR(100),
    alamat TEXT,
    keperluan TEXT,
    status VARCHAR(20) DEFAULT 'Diproses',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert dummy data
INSERT INTO pengajuan (kode_pengajuan, nama, nik, no_hp, jenis_layanan, alamat, keperluan, status) VALUES
('PGJ-2026-001', 'Budi Santoso', '3201234567890001', '081234567890', 'Surat Domisili', 'RT 01 RW 02, Desa Sukamakmur', 'Persyaratan melamar pekerjaan', 'Diproses'),
('PGJ-2026-002', 'Siti Aminah', '3201234567890002', '082198765432', 'Surat Keterangan Usaha', 'RT 03 RW 01, Desa Sukamakmur', 'Pengajuan KUR Bank BRI', 'Setujui'),
('PGJ-2026-003', 'Joko Widodo', '3201234567890003', '085712345678', 'Surat Tidak Mampu', 'RT 02 RW 02, Desa Sukamakmur', 'Beasiswa sekolah anak', 'Ditolak');
