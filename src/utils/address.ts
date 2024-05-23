export const FALLBACK_AVATAR = 'https://github.com/shadcn.png'
export const FALLBACK_ALT = '@shadcn'

// todo: this is a pool contract that we use as a fallback for computing swap routes.
export const FALLBACK_MARKET_ADDRESS =
    '0x1791d400741E9168fF678bdeE36DB448E2D9ea28'

export function shortAddress(address: `0x${string}`): string {
    if (typeof address === 'undefined') return 'N/A'
    return `${address.slice(0, 6)}...${address.slice(-4)}`
}
