import { Address, getAddress } from 'viem'

export const FALLBACK_AVATAR = 'https://github.com/shadcn.png'
export const FALLBACK_ALT = '@shadcn'

// todo: this is a pool contract that we use as a fallback for computing swap routes.
export const FALLBACK_MARKET_ADDRESS = getAddress(
    '0x533A549acca30F1B8f56eB320d80DfB1AbaB1883'
)

export function shortAddress(address: `0x${string}`): string {
    if (typeof address === 'undefined') return 'N/A'
    return `${address.slice(0, 6)}...${address.slice(-4)}`
}

declare global {
    interface String {
        comp(b: string): boolean
    }
}

String.prototype.comp = function (
    this: string | Address,
    b: string | Address
): boolean {
    let a_1
    try {
        a_1 = getAddress(this)
    } catch (e) {
        return false
    }

    let b_1
    try {
        b_1 = getAddress(b)
    } catch (e) {
        return false
    }

    return a_1 === b_1
}
