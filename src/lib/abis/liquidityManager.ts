export const liquidityManagerABI = [
    {
        type: 'function',
        name: 'allocateFromPt',
        inputs: [
            {
                name: 'args',
                type: 'tuple',
                internalType: 'struct LiquidityManager.AllocateArgs',
                components: [
                    { name: 'rmm', type: 'address', internalType: 'address' },
                    {
                        name: 'amountIn',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'minOut',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'minLiquidityDelta',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'initialGuess',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'epsilon',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
        ],
        outputs: [
            { name: 'liquidity', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'allocateFromSy',
        inputs: [
            {
                name: 'args',
                type: 'tuple',
                internalType: 'struct LiquidityManager.AllocateArgs',
                components: [
                    { name: 'rmm', type: 'address', internalType: 'address' },
                    {
                        name: 'amountIn',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'minOut',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'minLiquidityDelta',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'initialGuess',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'epsilon',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
        ],
        outputs: [
            { name: 'liquidity', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'computePtToSyToAddLiquidity',
        inputs: [
            {
                name: 'args',
                type: 'tuple',
                internalType: 'struct LiquidityManager.ComputeArgs',
                components: [
                    { name: 'rmm', type: 'address', internalType: 'address' },
                    { name: 'rX', type: 'uint256', internalType: 'uint256' },
                    { name: 'rY', type: 'uint256', internalType: 'uint256' },
                    { name: 'index', type: 'uint256', internalType: 'PYIndex' },
                    { name: 'maxIn', type: 'uint256', internalType: 'uint256' },
                    {
                        name: 'blockTime',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'initialGuess',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'epsilon',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
        ],
        outputs: [
            { name: 'guess', type: 'uint256', internalType: 'uint256' },
            { name: 'syOut', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'computeSyToPtToAddLiquidity',
        inputs: [
            {
                name: 'args',
                type: 'tuple',
                internalType: 'struct LiquidityManager.ComputeArgs',
                components: [
                    { name: 'rmm', type: 'address', internalType: 'address' },
                    { name: 'rX', type: 'uint256', internalType: 'uint256' },
                    { name: 'rY', type: 'uint256', internalType: 'uint256' },
                    { name: 'index', type: 'uint256', internalType: 'PYIndex' },
                    { name: 'maxIn', type: 'uint256', internalType: 'uint256' },
                    {
                        name: 'blockTime',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'initialGuess',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'epsilon',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
        ],
        outputs: [
            { name: 'guess', type: 'uint256', internalType: 'uint256' },
            { name: 'ptOut', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'mintSY',
        inputs: [
            { name: 'SY', type: 'address', internalType: 'address' },
            { name: 'receiver', type: 'address', internalType: 'address' },
            { name: 'tokenIn', type: 'address', internalType: 'address' },
            {
                name: 'amountTokenToDeposit',
                type: 'uint256',
                internalType: 'uint256',
            },
            { name: 'minSharesOut', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [
            { name: 'amountOut', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'payable',
    },
    {
        type: 'error',
        name: 'InsufficientSYMinted',
        inputs: [
            { name: 'amountMinted', type: 'uint256', internalType: 'uint256' },
            {
                name: 'minAmountMinted',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
    },
    {
        type: 'error',
        name: 'InvalidTokenIn',
        inputs: [{ name: 'tokenIn', type: 'address', internalType: 'address' }],
    },
]
