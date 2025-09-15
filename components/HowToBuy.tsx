"use client"
import { ExternalLink } from 'lucide-react'
import { getLinks } from '@/lib/links'

type Step = {
  title: string
  body: string
  cta: string
  href: string
}

export default function HowToBuy() {
  const links = getLinks()
  const phantomBuy = 'https://phantom.app/'

  const steps: Step[] = [
    {
      title: 'Create Wallet',
      body:
        'Download Phantom or your wallet of choice from the App Store or Google Play for free. Desktop users: add the Chrome extension via Phantom.',
      cta: 'Get Phantom',
      href: phantomBuy,
    },
    {
      title: 'Get Some SOL',
      body:
        'Have SOL in your wallet to swap for $JOBLESS. You can buy SOL directly in Phantom, transfer from another wallet, or buy on an exchange and send it to your wallet.',
      cta: 'Buy SOL',
      href: phantomBuy,
    },
    {
      title: 'Go to Pump.fun',
      body:
        'Open Pump.fun and connect your wallet. Use the $JOBLESS token address if needed, select Buy, and confirm — then approve the transaction in Phantom.',
      cta: 'Open Pump.fun',
      href: links.pumpfun,
    },
    {
      title: 'Buy $JOBLESS',
      body:
        'Buy $JOBLESS using SOL on Pump.fun. You don’t need to set custom slippage. If you’re out of SOL, you can purchase directly in Phantom.',
      cta: 'Buy Now',
      href: links.pumpfun,
    },
  ]

  return (
    <section id="how-to-buy" className="section py-16 sm:py-24">
      <h2 className="section-title text-center">Buy $JOBLESS: How to Get Started</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 items-stretch">
        {steps.map((s) => (
          <article
            key={s.title}
            className="card p-5 sm:p-6 transition hover:bg-white/[0.06] h-full flex flex-col items-center sm:items-start text-center sm:text-left"
          >
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-wide">
              <span className="bg-gradient-to-r from-[var(--magenta)] to-[var(--accent)] bg-clip-text text-transparent">
                {s.title}
              </span>
            </h3>
            <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed max-w-prose mx-auto sm:mx-0">
              {s.body}
            </p>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="button-primary mt-auto w-full sm:w-auto"
            >
              {s.cta} <ExternalLink className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
