export function shortAddress(address: `0x${string}`): string {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
}
