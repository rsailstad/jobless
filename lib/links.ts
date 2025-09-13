export type Links = {
  mint: string
  pair: string
  pumpfun: string
  dexscreenerPair: string
  dexscreenerToken: string
  solscan: string
  x: string
  telegram: string
  xCommunity: string
}

/**
 * Builds all outbound links from env. Values are read at build-time.
 */
export function getLinks(): Links {
  const mint = process.env.NEXT_PUBLIC_JOBLESS_MINT || ''
  const pair = process.env.NEXT_PUBLIC_JOBLESS_PAIR || ''

  return {
    mint,
    pair,
    pumpfun: `https://pump.fun/coin/${mint}`,
    dexscreenerPair: `https://dexscreener.com/solana/${pair}`,
    dexscreenerToken: `https://dexscreener.com/solana/${mint}`,
    solscan: `https://solscan.io/token/${mint}`,
    x: 'https://x.com/jobless_CTO',
    telegram: 'https://t.co/192X6jRg7S',
    xCommunity: 'https://x.com/i/communities/1963659733547528200',
  }
}
