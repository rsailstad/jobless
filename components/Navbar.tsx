import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
      <div className="section flex h-14 items-center justify-between">
        <Link href="#" aria-label="$JOBLESS home" className="group">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-white/20 to-white/5 grid place-items-center border border-white/10">
            <span className="font-black tracking-wider text-white/90">J</span>
          </div>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-4 text-sm text-white/80">
            <li>
              <a href="#chart" className="hover:text-white focus-visible:text-white" aria-label="Jump to Live Chart">
                Chart
              </a>
            </li>
            <li>
              <a href="#tokenomics" className="hover:text-white focus-visible:text-white" aria-label="Jump to Tokenomics">
                Tokenomics
              </a>
            </li>
            <li>
              <a
                href="#news"
                className="hover:text-white focus-visible:text-white font-semibold text-white animate-pulse"
                aria-label="Jump to News"
              >
                News
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-white focus-visible:text-white" aria-label="Jump to FAQs">
                FAQ
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
