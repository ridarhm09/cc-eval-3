import { useState } from 'react';

function App() {

  const [nama, setNama] = useState('');
  const [jenis, setJenis] = useState('');
  const [keperluan, setKeperluan] = useState('');

  const submitData = async () => {

    await fetch('http://192.168.229.129:5000/pengajuan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nama,
        jenis,
        keperluan
      })
    });

    alert('Pengajuan berhasil');
  };

  return (
    <div style={{padding:'30px'}}>
      <h1>Sistem Pelayanan Publik Desa</h1>

      <input
        placeholder="Nama"
        onChange={(e)=>setNama(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Jenis Surat"
        onChange={(e)=>setJenis(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Keperluan"
        onChange={(e)=>setKeperluan(e.target.value)}
      />

      <br/><br/>

      <button onClick={submitData}>
        Submit
      </button>

    </div>
  );
}

export default App;
