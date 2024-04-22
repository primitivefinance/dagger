import { encodeAbiParameters, parseAbiParameters } from 'viem'
import { fromWad, toWad } from './numbers'

export function prepareDeallocate(
    amountLPT: string,
    reservesWad: bigint[],
    totalLPT: bigint
): {
    deltas: number[]
    liquidity: number
    payload: string
} {
    // Check if the amount is an empty string and return an empty payload.
    if (amountLPT === '') {
        return {
            deltas: [],
            liquidity: 0,
            payload: '',
        }
    }

    // Check if the amount can be parsed as a number.
    if (isNaN(Number(amountLPT))) {
        throw new Error('Amount must be a number')
    }

    const liquidityWad = toWad(parseFloat(amountLPT))

    const tokenDeltas = reservesWad.map((reserveWad) => {
        return (reserveWad * liquidityWad) / totalLPT
    })

    const payload = encodeAbiParameters(parseAbiParameters('uint[], uint'), [
        tokenDeltas,
        liquidityWad,
    ])

    return {
        deltas: tokenDeltas.map(fromWad),
        liquidity: parseFloat(amountLPT),
        payload,
    }
}
