# $JOBLESS — Solana Meme Coin Landing

Production-ready single-page site built with Next.js 14 (App Router), TypeScript, TailwindCSS, framer-motion, and lucide-react. No external images; all gradients/CSS.

## Setup

1) Install deps

```
npm i
```

2) Add environment variables in `.env.local`

```
NEXT_PUBLIC_JOBLESS_MINT=REPLACE_ME
NEXT_PUBLIC_JOBLESS_PAIR=REPLACE_ME
```

3) Run dev server

```
npm run dev
```

Open http://localhost:3000.

## Banner image

- Place your banner file at `public/banner.jpg` (recommended ~1800×600 or similar 3:1 aspect). The hero is sized responsively to a 3:1 ratio and uses `next/image` for optimization.
- You can use other formats (e.g., `banner.webp`) — if you do, update the `src` in `components/Hero.tsx` accordingly.

## Tokenomics: tweaking via props

Edit `app/page.tsx` and pass your own items to `Tokenomics`:

```tsx
<Tokenomics
  items={[
    { label: 'Total Supply', value: '10,000,000,000 $JOBLESS', icon: 'Coins' },
    { label: 'Liquidity', value: 'Locked', icon: 'Lock' },
    { label: 'Taxes', value: '0 / 0', icon: 'Percent' },
    { label: 'Distribution', value: 'Fair launch', icon: 'PieChart' },
    { label: 'Chain', value: 'Solana', icon: 'BadgeDollarSign' },
  ]}
/>
```

- Icons accept any name from `lucide-react` (e.g., `Lock`, `Percent`, `PieChart`).
- All outbound links are generated from `lib/links.ts` using env vars; no mint/pair hardcoding.

## Notes

- Sticky navbar with blur + border.
- Hero includes copy-to-clipboard for the mint, with a temporary “Copied” state.
- Dexscreener chart is an iframe in a responsive 16:9 container, lazy-loaded.
- Sections use framer-motion for tasteful fade/slide reveals.
- Accessible components: keyboard focus styles, aria labels, and FAQ accordion with single-open behavior.
