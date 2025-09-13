"use client"
import { useState, useId, KeyboardEvent } from 'react'
import { ChevronDown, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { getLinks } from '@/lib/links'

type QA = { q: string; a: React.ReactNode; id: string }

export default function FAQ() {
  const links = getLinks()
  const data: QA[] = [
    {
      id: 'what',
      q: 'What is $JOBLESS?',
      a: 'A community-driven Solana meme coin for those ditching the 9–5 to pursue passion.',
    },
    {
      id: 'where',
      q: 'Where to buy?',
      a: (
        <span>
          Buy on Pump.fun via{' '}
          <a className="underline" href={links.pumpfun} target="_blank" rel="noreferrer noopener">
            this link
          </a>
          .
        </span>
      ),
    },
    {
      id: 'contract',
      q: "What's the contract address?",
      a: <code className="font-mono">{links.mint || 'Add NEXT_PUBLIC_JOBLESS_MINT'}</code>,
    },
    {
      id: 'liquidity',
      q: 'Is liquidity locked?',
      a: 'Liquidity state is announced by the team post-launch (placeholder: locked/burned).',
    },
    {
      id: 'solscan',
      q: 'How to view on Solscan?',
      a: (
        <span>
          Open the token page on{' '}
          <a className="underline" href={links.solscan} target="_blank" rel="noreferrer noopener">
            Solscan
          </a>
          .
        </span>
      ),
    },
    {
      id: 'advice',
      q: 'Is this financial advice?',
      a: 'Absolutely not. This is entertainment, memes, and community vibes only.',
    },
  ]

  const [openId, setOpenId] = useState<string | null>(data[0].id)

  function handleKey(e: KeyboardEvent<HTMLButtonElement>, id: string) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpenId((curr) => (curr === id ? null : id))
    }
  }

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
        FAQ
      </motion.h2>

      <div className="divide-y divide-white/10 rounded-2xl border border-white/10">
        {data.map((item) => {
          const contentId = useId()
          const isOpen = openId === item.id
          return (
            <div key={item.id} className="bg-white/5">
              <button
                aria-expanded={isOpen}
                aria-controls={contentId}
                className="flex w-full items-center justify-between px-4 py-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                onKeyDown={(e) => handleKey(e, item.id)}
              >
                <span className="text-sm font-medium text-white/90">{item.q}</span>
                <ChevronDown className={`h-5 w-5 transition ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              <div
                id={contentId}
                role="region"
                className={`px-4 pb-4 text-sm text-white/80 transition-[grid-template-rows] ${
                  isOpen ? 'grid grid-rows-[1fr]' : 'grid grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">{item.a}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

