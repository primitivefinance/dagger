import { formatUnits, parseEther } from 'viem'

/**
 * @notice Formats a number as a currency string based on USD.
 */
export function formatNumber(
    amount: number,
    currency?: string,
    style: 'percent' | 'decimal' | 'currency' | 'unit' = 'decimal'
): string {
    const defaultOptions = {
        maximumSignificantDigits: 3,
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
        roundingPriority: 'morePrecision',
        roundingMode: 'trunc',
    }

    let options = defaultOptions
    if (style) {
        options = {
            ...options,
            style,
        }
    }

    if (currency) {
        options = {
            ...options,
            currency,
            style: 'currency',
        }
    }
    return new Intl.NumberFormat('en-US', options).format(amount)
}

export function formatWad(wad: bigint): string {
    return formatNumber(Number(formatUnits(wad, 18)))
}

export function formatWadPercentage(wad: bigint): string {
    return formatNumber(Number(formatUnits(wad, 18)), undefined, 'percent')
}

export function toWad(amount: number): bigint {
    return parseEther(amount.toString())
}
