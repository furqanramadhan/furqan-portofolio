import { AudioProvider } from './AudioProvider';

export default function HbdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Membungkus semua halaman di dalam folder hbdbebeb dengan Audio
    <AudioProvider>
      {children}
    </AudioProvider>
  );
}