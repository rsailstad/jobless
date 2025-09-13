"use client"
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Item = {
  label: string
  value: string
  icon?: keyof typeof Icons
}

function getIcon(name?: keyof typeof Icons): LucideIcon {
  const candidate = name ? (Icons as Record<string, unknown>)[name] : undefined
  return typeof candidate === 'function' ? (candidate as LucideIcon) : Icons.Info
}

export default function Tokenomics({ items }: { items: Item[] }) {
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
        Tokenomics
      </motion.h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          const IconComp = getIcon(item.icon)
          return (
            <motion.div
              key={i}
              className="card p-5 transition hover:bg-white/[0.08]"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              role="group"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 shrink-0 rounded-xl bg-white/5 grid place-items-center border border-white/10">
                  <IconComp className="h-5 w-5 text-white/90" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-white/70">{item.label}</div>
                  <div className="truncate text-lg font-semibold">{item.value}</div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
