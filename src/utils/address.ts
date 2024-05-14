export const FALLBACK_AVATAR = 'https://github.com/shadcn.png'
export const FALLBACK_ALT = '@shadcn'

export function shortAddress(address: `0x${string}`): string {
    if (typeof address === 'undefined') return 'N/A'
    return `${address.slice(0, 6)}...${address.slice(-4)}`
}
