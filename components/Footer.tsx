import { getLinks } from '@/lib/links'

export default function Footer() {
  const links = getLinks()
  return (
    <footer className="mt-16 border-t border-white/10 py-8">
      <div className="section flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-white/20 to-white/5 grid place-items-center border border-white/10">
            <span className="font-black text-sm tracking-wider text-white/90">J</span>
          </div>
          <span className="text-white/70 text-sm">$JOBLESS</span>
        </div>

        <p className="text-center text-xs text-white/60">
          For entertainment and community only — not financial advice.
        </p>

        <nav aria-label="Quick links" className="text-sm">
          <ul className="flex items-center gap-4 text-white/80">
            <li>
              <a href={links.dexscreenerPair} target="_blank" rel="noreferrer noopener" className="hover:text-white">
                Dexscreener
              </a>
            </li>
            <li>
              <a href={links.pumpfun} target="_blank" rel="noreferrer noopener" className="hover:text-white">
                Pump.fun
              </a>
            </li>
            <li>
              <a href={links.solscan} target="_blank" rel="noreferrer noopener" className="hover:text-white">
                Solscan
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
