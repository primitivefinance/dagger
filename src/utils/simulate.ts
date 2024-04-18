import { dfmmAddress } from '@/data/contracts'
import {
    Address,
    Hex,
    encodeAbiParameters,
    encodePacked,
    hexToBigInt,
    keccak256,
    maxUint256,
    numberToHex,
    padHex,
    parseAbiParameters,
    toHex,
} from 'viem'

export const ERC20_ALLOWANCE_SLOT = 4

export function computeReservesStorageSlot(
    poolId: number,
    reserveIndex: number
) {
    const mappingKey = poolId
    const mappingSlot = 0
    const reserveStructIndex = 5
    const structSlot = hexToBigInt(
        keccak256(
            encodeAbiParameters(parseAbiParameters('uint, uint'), [
                mappingKey,
                mappingSlot,
            ])
        )
    )

    const storageSlot = toHex(
        hexToBigInt(
            keccak256(
                encodeAbiParameters(parseAbiParameters('uint, uint'), [
                    reserveStructIndex,
                    structSlot,
                ])
            )
        ) + BigInt(reserveIndex)
    )

    return storageSlot
}

export function computeAllowanceSlot(owner: Address, spender: Address): Hex {
    return keccak256(
        encodePacked(
            ['bytes32', 'bytes32'],
            [
                padHex(spender, { size: 32 }),
                keccak256(
                    encodePacked(
                        ['bytes32', 'uint'],
                        [
                            padHex(owner, { size: 32 }),
                            BigInt(ERC20_ALLOWANCE_SLOT),
                        ]
                    )
                ),
            ]
        )
    )
}

const maxAllowance = numberToHex(maxUint256)

/**
 * @notice Returns the storage slot and override value object for the stateOverride array in `simulateContract`.
 */
export function overrideAllowanceDFMM(owner: Address): {
    slot: Hex
    value: Hex
} {
    return {
        slot: computeAllowanceSlot(owner as `0x${string}`, dfmmAddress),
        value: maxAllowance,
    }
}

/**
 * @notice Returns the storage slot overrides for a given token. Defaults to max allowance.
 */
export function overrideTokenAllowanceSlot(
    token: Address,
    owner: Address
): {
    address: Address
    stateDiff: {
        slot: Hex
        value: Hex
    }[]
} {
    return {
        address: token,
        stateDiff: [overrideAllowanceDFMM(owner as `0x${string}`)],
    }
}
