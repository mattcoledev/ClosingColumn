import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'The Closing Column — Real Estate Insights That Move the Market',
    template: '%s | The Closing Column',
  },
  description:
    'The Closing Column is an editorial real estate publication covering homebuying, investing, market analysis, and the business of real estate.',
  metadataBase: new URL('https://closingcolumn.com'),
  openGraph: {
    siteName: 'The Closing Column',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
