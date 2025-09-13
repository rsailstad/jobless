"use client"
import { motion } from 'framer-motion'
import { Megaphone, ExternalLink } from 'lucide-react'

type NewsItem = {
  date: string
  title: string
  href?: string
}

const news: NewsItem[] = [
  {
    date: '2025-09-12',
    title: '142,083,059 $JOBLESS LOCKED on-chain via @streamflow_fi!',
    href: 'https://x.com/jobless_CTO/status/1966236611269529768',
  },
  {
    date: '2025-09-07',
    title: 'The $JOBLESS Story — From the ashes to glory',
    href: 'https://x.com/valen_mamondez/status/1964869445563936985',
  },
  {
    date: '2025-09-05',
    title: '$JOBLESS IS NOW 100% COMMUNITY OWNED',
    href: 'https://x.com/valen_mamondez/status/1964022258877317331',
  },
]

export default function News() {
  return (
    <div>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <Megaphone className="h-5 w-5" />
        News
      </motion.h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {news.map((item, i) => (
          <motion.article
            key={item.title + item.date}
            className="card p-5"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <time className="text-xs text-white/60" dateTime={item.date}>
              {item.date}
            </time>
            <h3 className="mt-1 text-lg font-semibold">
              {item.title}
            </h3>
            {item.href && (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
                aria-label={`Open: ${item.title}`}
              >
                Read more <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </div>
  )
}
