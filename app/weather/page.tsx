export default function WeatherPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#0A0C10' }}>
      <iframe
        src="https://kenar-sky-guardian.streamlit.app/?embed=true"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        title="Kenar's Sky Guardian"
        allow="geolocation" // Izin agar AI bisa deteksi lokasi kalau perlu
      />
    </div>
  );
}