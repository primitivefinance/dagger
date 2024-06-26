export const nG3mSolverAbi = [
    {
        type: 'constructor',
        inputs: [
            { name: '_strategy', type: 'address', internalType: 'address' },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'computePriceOfToken',
        inputs: [
            { name: 'rT', type: 'uint256', internalType: 'uint256' },
            { name: 'rNumeraire', type: 'uint256', internalType: 'uint256' },
            { name: 'wT', type: 'uint256', internalType: 'uint256' },
            { name: 'wNumeraire', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [{ name: 'price', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'pure',
    },
    {
        type: 'function',
        name: 'getAllocationDeltasGivenDeltaT',
        inputs: [
            { name: 'poolId', type: 'uint256', internalType: 'uint256' },
            { name: 'indexT', type: 'uint256', internalType: 'uint256' },
            { name: 'deltaT', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [
            { name: '', type: 'uint256[]', internalType: 'uint256[]' },
            { name: '', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getDeallocationDeltasGivenDeltaT',
        inputs: [
            { name: 'poolId', type: 'uint256', internalType: 'uint256' },
            { name: 'indexT', type: 'uint256', internalType: 'uint256' },
            { name: 'deltaT', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [
            { name: '', type: 'uint256[]', internalType: 'uint256[]' },
            { name: '', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getInitialPoolData',
        inputs: [
            {
                name: 'numeraireAmount',
                type: 'uint256',
                internalType: 'uint256',
            },
            { name: 'prices', type: 'uint256[]', internalType: 'uint256[]' },
            {
                name: 'params',
                type: 'tuple',
                internalType: 'struct NTokenGeometricMeanParams',
                components: [
                    {
                        name: 'weights',
                        type: 'uint256[]',
                        internalType: 'uint256[]',
                    },
                    {
                        name: 'swapFee',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'controller',
                        type: 'address',
                        internalType: 'address',
                    },
                ],
            },
        ],
        outputs: [{ name: '', type: 'bytes', internalType: 'bytes' }],
        stateMutability: 'pure',
    },
    {
        type: 'function',
        name: 'getNextLiquidity',
        inputs: [{ name: 'poolId', type: 'uint256', internalType: 'uint256' }],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getPoolParams',
        inputs: [{ name: 'poolId', type: 'uint256', internalType: 'uint256' }],
        outputs: [
            {
                name: '',
                type: 'tuple',
                internalType: 'struct NTokenGeometricMeanParams',
                components: [
                    {
                        name: 'weights',
                        type: 'uint256[]',
                        internalType: 'uint256[]',
                    },
                    {
                        name: 'swapFee',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'controller',
                        type: 'address',
                        internalType: 'address',
                    },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getReservesAndLiquidity',
        inputs: [{ name: 'poolId', type: 'uint256', internalType: 'uint256' }],
        outputs: [
            { name: '', type: 'uint256[]', internalType: 'uint256[]' },
            { name: '', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'prepareControllerUpdate',
        inputs: [
            { name: 'controller', type: 'address', internalType: 'address' },
        ],
        outputs: [{ name: '', type: 'bytes', internalType: 'bytes' }],
        stateMutability: 'pure',
    },
    {
        type: 'function',
        name: 'prepareFeeUpdate',
        inputs: [{ name: 'swapFee', type: 'uint256', internalType: 'uint256' }],
        outputs: [{ name: 'data', type: 'bytes', internalType: 'bytes' }],
        stateMutability: 'pure',
    },
    {
        type: 'function',
        name: 'prepareWeightsUpdate',
        inputs: [
            {
                name: 'targetWeights',
                type: 'uint256[]',
                internalType: 'uint256[]',
            },
            {
                name: 'targetTimestamp',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [{ name: '', type: 'bytes', internalType: 'bytes' }],
        stateMutability: 'pure',
    },
    {
        type: 'function',
        name: 'simulateSwap',
        inputs: [
            { name: 'poolId', type: 'uint256', internalType: 'uint256' },
            { name: 'tokenInIndex', type: 'uint256', internalType: 'uint256' },
            { name: 'tokenOutIndex', type: 'uint256', internalType: 'uint256' },
            { name: 'amountIn', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [
            { name: '', type: 'bool', internalType: 'bool' },
            { name: '', type: 'uint256', internalType: 'uint256' },
            { name: '', type: 'bytes', internalType: 'bytes' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'strategy',
        inputs: [],
        outputs: [{ name: '', type: 'address', internalType: 'address' }],
        stateMutability: 'view',
    },
]
