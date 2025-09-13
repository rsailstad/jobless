import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '$JOBLESS — Solana Meme Coin',
  description:
    'Ditch the 9–5. Embrace $JOBLESS — a meme coin for people who trade their punch clock for passion. Born on Pump.fun, powered by Solana.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: '$JOBLESS — Solana Meme Coin',
    description:
      'Ditch the 9–5. Embrace $JOBLESS — a meme coin for people who trade their punch clock for passion. Born on Pump.fun, powered by Solana.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '$JOBLESS — Solana Meme Coin',
    description:
      'Ditch the 9–5. Embrace $JOBLESS — a meme coin for people who trade their punch clock for passion. Born on Pump.fun, powered by Solana.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-neutral-950">
      <body>{children}</body>
    </html>
  )
}

