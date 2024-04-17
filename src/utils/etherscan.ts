export const OP_SEPOLIA_ETHERSCAN = 'https://sepolia-optimistic.etherscan.io'

export function etherscanAddressLink(address: string): string {
    return `${OP_SEPOLIA_ETHERSCAN}/address/${address}`
}

export function etherscanTxLink(tx: string): string {
    return `${OP_SEPOLIA_ETHERSCAN}/tx/${tx}`
}
