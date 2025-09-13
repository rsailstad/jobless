"use client"
import { useState } from 'react'
import Image from 'next/image'
import { Copy, Check, Sparkles, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { getLinks } from '@/lib/links'

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Hero() {
  const links = getLinks()
  const [copied, setCopied] = useState(false)

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(links.mint)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch (e) {
      console.error('Copy failed', e)
    }
  }

  return (
    <section className="section py-16 sm:py-24">
      {/* Full-width banner with right-side overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="card overflow-hidden">
          <div className="relative w-full aspect-[3/1]">
            <Image
              src="/joblessbanner.jpeg"
              alt="$JOBLESS banner art"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Subtle gradient on the right for readability */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-black/50 to-transparent"
              aria-hidden
            />
            {/* Overlay content on the right third */}
            <div className="absolute inset-0 flex justify-end">
              <div className="h-full w-full sm:w-2/3 md:w-1/3 flex items-center p-4 sm:p-6 md:p-8">
                <div>
                  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight lowercase text-white">
                    $jobless
                  </h1>
                  <p className="mt-3 sm:mt-4 text-white/90 lowercase max-w-[36ch]">
                    work is temporary, bags are forever.  not broke, pre-rich
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Calls-to-action and links below the banner */}
      <motion.div initial="hidden" animate="show" variants={fadeUp} className="mt-8">
        <div className="chip mb-4" aria-hidden>
          <Sparkles className="h-4 w-4" />
          <span>Born on Pump.fun • Powered by Solana</span>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href={links.pumpfun}
            target="_blank"
            rel="noreferrer noopener"
            className="button-primary"
            aria-label="Buy on Pump.fun"
          >
            Buy on Pump.fun <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href={links.dexscreenerPair}
            target="_blank"
            rel="noreferrer noopener"
            className="button-secondary"
            aria-label="View on Dexscreener"
          >
            View on Dexscreener <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-6 card p-3">
          <div className="flex items-center gap-3">
            <code className="truncate font-mono text-xs text-white/80" aria-label="Contract address">
              {links.mint || 'Add NEXT_PUBLIC_JOBLESS_MINT'}
            </code>
            <button
              onClick={copyToClipboard}
              className="button-secondary px-3 py-2 text-xs"
              aria-label={copied ? 'Copied contract address' : 'Copy contract address'}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="sr-only">Copy</span>
              <span className="ml-1">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4 text-sm text-white/80">
          <a
            href={links.x}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="$JOBLESS on X"
            className="hover:text-white"
          >
            X (Twitter)
          </a>
          <a
            href={links.telegram}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="$JOBLESS on Telegram"
            className="hover:text-white"
          >
            Telegram
          </a>
          <a
            href={links.solscan}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="View token on Solscan"
            className="hover:text-white"
          >
            Solscan
          </a>
        </div>
      </motion.div>
    </section>
  )
}
