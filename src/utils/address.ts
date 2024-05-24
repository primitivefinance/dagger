import { getAddress } from 'viem'

export const FALLBACK_AVATAR = 'https://github.com/shadcn.png'
export const FALLBACK_ALT = '@shadcn'

// todo: this is a pool contract that we use as a fallback for computing swap routes.
export const FALLBACK_MARKET_ADDRESS = getAddress(
    '0xb62a840ef9b9b5fcf39fec90fab94e760e3511bd'
)

export function shortAddress(address: `0x${string}`): string {
    if (typeof address === 'undefined') return 'N/A'
    return `${address.slice(0, 6)}...${address.slice(-4)}`
}
