"use client"
import { motion } from 'framer-motion'
import { ExternalLink, Sparkles } from 'lucide-react'
import { getLinks } from '@/lib/links'

export default function Chart() {
  const links = getLinks()

  return (
    <div>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <Sparkles className="h-5 w-5" />
        Live Chart
      </motion.h2>

      {/* Taller on mobile for readability; use 16:9 from md+ */}
      <div className="relative w-full h-[520px] sm:h-[560px] md:h-0 md:pb-[56.25%]">
        <iframe
          title="$JOBLESS on Dexscreener"
          src={`${links.dexscreenerPair}?embed=1&theme=dark`}
          className="absolute inset-0 h-full w-full rounded-2xl border border-white/10"
          loading="lazy"
        />
      </div>
      <div className="mt-3 text-right text-sm">
        <a
          href={links.dexscreenerPair}
          target="_blank"
          rel="noreferrer noopener"
          className="text-white/80 hover:text-white inline-flex items-center gap-1"
          aria-label="Open pair in Dexscreener"
        >
          Open in Dexscreener <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
