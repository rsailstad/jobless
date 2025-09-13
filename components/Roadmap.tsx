"use client"
import { motion } from 'framer-motion'
import { BadgeCheck, Clock, Rocket, Sparkles } from 'lucide-react'

const phases = [
  {
    title: 'Phase 1: Launch & Vibes',
    items: ['Pump.fun launch', 'DEX listing', 'Socials live'],
    badge: { text: 'Live', icon: BadgeCheck },
  },
  {
    title: 'Phase 2: Community Mayhem',
    items: ['Memes & raids', 'Collabs & AMAs', 'Contests'],
    badge: { text: 'Soon', icon: Clock },
  },
  {
    title: 'Phase 3: Expansion Pack',
    items: ['Utilities', 'Partnerships', 'TBD'],
    badge: { text: 'Soon', icon: Rocket },
  },
]

export default function Roadmap() {
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
        Roadmap
      </motion.h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {phases.map((phase, i) => (
          <motion.div
            key={phase.title}
            className="card p-5"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{phase.title}</h3>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/80">
                <phase.badge.icon className="h-3.5 w-3.5" /> {phase.badge.text}
              </span>
            </div>
            <ul className="mt-2 space-y-2 text-sm text-white/80">
              {phase.items.map((it) => (
                <li key={it} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

