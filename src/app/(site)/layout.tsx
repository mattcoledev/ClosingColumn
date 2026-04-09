import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SanityLive } from '@/sanity/lib/live'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <SanityLive />
    </>
  )
}
