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
    <>
      {/* Full-width banner with right-side overlay (bleeds to viewport edges) */}
      <motion.div
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-full aspect-[3/1]">
          {/* Top and bottom gradient dividers matching section separators */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-0.5 divider-gradient opacity-80 z-10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 divider-gradient opacity-80 z-10"
            aria-hidden
          />
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
            <div className="h-full w-2/3 sm:w-1/2 md:w-1/3 ml-auto flex items-center justify-end p-4 sm:p-6 md:p-8 text-right">
              <div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight lowercase text-white">
                  $jobless
                </h1>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-white/90 lowercase max-w-[36ch]">
                  work is temporary, bags are forever.  not broke, pre-rich
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scrolling ticker announcement just below the banner */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <div className="relative overflow-hidden bg-[rgba(0,229,255,0.08)] group">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 divider-gradient opacity-80" aria-hidden />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 divider-gradient opacity-80" aria-hidden />
          <div className="flex whitespace-nowrap animate-ticker [animation-play-state:running] group-hover:[animation-play-state:paused]">
            <a
              href="https://x.com/jobless_CTO/status/1967143345827852406"
              target="_blank"
              rel="noreferrer noopener"
              className="px-6 py-2 font-semibold tracking-wide text-[var(--text)] hover:text-white"
              aria-label="Open announcement: MAJOR $JOBLESS CONTEST ANNOUNCEMENT!"
            >
              MAJOR $JOBLESS CONTEST ANNOUNCEMENT!
            </a>
            <span className="px-6 text-white/40">•</span>
            <a
              href="https://x.com/jobless_CTO/status/1967143345827852406"
              target="_blank"
              rel="noreferrer noopener"
              className="px-6 py-2 font-semibold tracking-wide text-[var(--text)] hover:text-white"
              aria-label="Open announcement: MAJOR $JOBLESS CONTEST ANNOUNCEMENT!"
            >
              MAJOR $JOBLESS CONTEST ANNOUNCEMENT!
            </a>
            <span className="px-6 text-white/40">•</span>
            <a
              href="https://x.com/jobless_CTO/status/1967143345827852406"
              target="_blank"
              rel="noreferrer noopener"
              className="px-6 py-2 font-semibold tracking-wide text-[var(--text)] hover:text-white"
              aria-label="Open announcement: MAJOR $JOBLESS CONTEST ANNOUNCEMENT!"
            >
              MAJOR $JOBLESS CONTEST ANNOUNCEMENT!
            </a>
          </div>
        </div>
      </div>

      {/* Calls-to-action and links below the banner */}
      <motion.div initial="hidden" animate="show" variants={fadeUp} className="section py-8 sm:py-12">
        <div className="chip mb-4" aria-hidden>
          <Sparkles className="h-4 w-4" />
          <span>Born on Pump.fun • Powered by Solana</span>
        </div>

        <div className="flex flex-wrap gap-2 justify-center text-center">
          <a
            href={links.pumpfun}
            target="_blank"
            rel="noreferrer noopener"
            className="button-primary px-3 py-2 text-sm sm:px-5 sm:py-3 whitespace-nowrap"
            aria-label="Buy on Pump.fun"
          >
            Buy on Pump.fun <ExternalLink className="h-4 w-4" />
          </a>
          <a
            href={links.dexscreenerPair}
            target="_blank"
            rel="noreferrer noopener"
            className="button-secondary px-3 py-2 text-sm sm:px-5 sm:py-3 whitespace-nowrap"
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
            <a
              href={links.xCommunity}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Community"
              className="font-semibold text-blue-400 hover:text-white animate-pulse"
            >
              Community
            </a>
          </div>
      </motion.div>
    </>
  )
}
