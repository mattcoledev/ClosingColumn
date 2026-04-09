// Full-viewport layout for the embedded Sanity Studio
// Root layout provides html/body; Studio manages its own internal chrome
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      {children}
    </div>
  )
}
