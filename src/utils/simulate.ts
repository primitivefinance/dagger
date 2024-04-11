import {
    Address,
    Hex,
    encodeAbiParameters,
    encodePacked,
    hexToBigInt,
    keccak256,
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
