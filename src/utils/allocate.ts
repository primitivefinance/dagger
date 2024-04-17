import { encodeAbiParameters, parseAbiParameters } from 'viem'
import { fromWad, toWad } from './numbers'

export function computeAllocationDeltasGivenDeltaT(
    amount: string,
    tokenIndex: number,
    reservesWad: bigint[],
    liquidityWad: bigint
): {
    deltas: bigint[]
    liquidity: bigint
} {
    const amountNumber = parseFloat(amount)
    const amountWad = toWad(amountNumber)

    let a = amountWad * toWad(1)
    const remainder = a % reservesWad[tokenIndex]
    a = a / reservesWad[tokenIndex]
    if (remainder !== 0n) {
        a += 1n
    }

    const reserveDeltas = []
    // todo: fix this, doesnt let us specify an exact amount because the rounding
    // expects all the amounts to be rounded.
    // reserveDeltas[tokenIndex] = amountWad
    for (let i = 0; i < reservesWad.length; i++) {
        const numerator = reservesWad[i] * a
        reserveDeltas[i] = numerator / toWad(1)
        if (numerator % toWad(1) !== 0n) {
            reserveDeltas[i] += 1n
        }
    }

    const deltaLiquidity = (a * liquidityWad) / toWad(1)

    return {
        deltas: reserveDeltas,
        liquidity: deltaLiquidity,
    }
}

/**
 * @dev TODO: needs to be fixed to work with other strategies and arbitrary weights. Assumes equal weights.
 * @notice Encodes the allocate transaction payload given a desired deposit amount
 * @param amount Quantity input provided by user, without any transformations applied.
 * @param tokenIndex Index of the token being provided.
 * @param reservesWad Native reserves in wad units of the pool.
 * @param liquidityWad Native liquidity in wad units of the pool.
 */
export function prepareAllocate(
    amount: string,
    tokenIndex: number,
    reservesWad: bigint[],
    liquidityWad: bigint
): { deltas: number[]; liquidity: number; payload: string } {
    // Check if the amount is an empty string and return an empty payload.
    if (amount === '') {
        return {
            deltas: [],
            liquidity: 0,
            payload: '',
        }
    }

    // Check if the amount can be parsed as a number.
    if (isNaN(Number(amount))) {
        throw new Error('Amount must be a number')
    }

    // Parse the amount as a number.
    const amountNumber = parseFloat(amount)

    // Transform the amount to the correct units.
    const amountWad = toWad(amountNumber)

    // Compute the change in liquidity by comparing the added amount proportional to the reserves and liquidity.
    /* const deltaLiquidity = (amountWad * liquidityWad) / reservesWad[tokenIndex]

    // Construct the token deltas being applied to the reserves.
    // Todo: just assumes equal amounts of the deposit amount provided by the user for now.
    const tokenDeltas = reservesWad.map((reserve) => {
        const numerator = reserve * deltaLiquidity
        const remainder = numerator % liquidityWad
        let delta = (reserve * deltaLiquidity) / liquidityWad
        if (remainder !== 0n) {
            delta += 1n
        }
        console.log({ numerator, reserve, deltaLiquidity, delta, remainder })
        return delta
    }) */
    const { deltas: tokenDeltas, liquidity: deltaLiquidity } =
        computeAllocationDeltasGivenDeltaT(
            amount,
            tokenIndex,
            reservesWad,
            liquidityWad
        )

    // Construct the payload.
    const payload = encodeAbiParameters(parseAbiParameters('uint[], uint'), [
        tokenDeltas,
        deltaLiquidity,
    ])

    // Return the computed variables.
    return {
        deltas: tokenDeltas.map(fromWad),
        liquidity: fromWad(deltaLiquidity),
        payload,
    }
}
