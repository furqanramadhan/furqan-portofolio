// app/bebebai/page.tsx
export default function BebebaiPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#0A0C10' }}>
      <iframe
        src="https://bebeb-weatherai.streamlit.app/?embed=true"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Kenar's Sky Guardian"
      />
    </div>
  );
}