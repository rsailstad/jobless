"use client"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
      <div className="section flex h-14 items-center justify-between">
        {/* Home icon (scroll to top) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="inline-flex items-center gap-2 text-white/90 hover:text-white focus-visible:text-white"
          aria-label="Go to top"
        >
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/30 text-white/90 font-semibold hover:border-white"
            aria-hidden
          >
            $
          </span>
        </a>
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
