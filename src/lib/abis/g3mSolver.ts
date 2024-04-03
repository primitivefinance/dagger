export const g3mSolverAbi = [
    {
        type: 'constructor',
        inputs: [
            { name: '_strategy', type: 'address', internalType: 'address' },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'allocateGivenX',
        inputs: [
            { name: 'poolId', type: 'uint256', internalType: 'uint256' },
            { name: 'amountX', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [
            { name: '', type: 'uint256', internalType: 'uint256' },
            { name: '', type: 'uint256', internalType: 'uint256' },
            { name: '', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'allocateGivenY',
        inputs: [
            { name: 'poolId', type: 'uint256', internalType: 'uint256' },
            { name: 'amountY', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [
            { name: '', type: 'uint256', internalType: 'uint256' },
            { name: '', type: 'uint256', internalType: 'uint256' },
            { name: '', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'checkSwapConstant',
        inputs: [
            { name: 'poolId', type: 'uint256', internalType: 'uint256' },
            { name: 'data', type: 'bytes', internalType: 'bytes' },
        ],
        outputs: [{ name: '', type: 'int256', internalType: 'int256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'deallocateGivenX',
        inputs: [
            { name: 'poolId', type: 'uint256', internalType: 'uint256' },
            { name: 'amountX', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [
            { name: '', type: 'uint256', internalType: 'uint256' },
            { name: '', type: 'uint256', internalType: 'uint256' },
            { name: '', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'deallocateGivenY',
        inputs: [
            { name: 'poolId', type: 'uint256', internalType: 'uint256' },
            { name: 'amountY', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [
            { name: '', type: 'uint256', internalType: 'uint256' },
            { name: '', type: 'uint256', internalType: 'uint256' },
            { name: '', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'fetchPoolParams',
        inputs: [{ name: 'poolId', type: 'uint256', internalType: 'uint256' }],
        outputs: [
            {
                name: '',
                type: 'tuple',
                internalType: 'struct G3M.G3MParams',
                components: [
                    { name: 'wX', type: 'uint256', internalType: 'uint256' },
                    { name: 'wY', type: 'uint256', internalType: 'uint256' },
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
        name: 'getInitialPoolData',
        inputs: [
            { name: 'rx', type: 'uint256', internalType: 'uint256' },
            { name: 'S', type: 'uint256', internalType: 'uint256' },
            {
                name: 'params',
                type: 'tuple',
                internalType: 'struct G3M.G3MParams',
                components: [
                    { name: 'wX', type: 'uint256', internalType: 'uint256' },
                    { name: 'wY', type: 'uint256', internalType: 'uint256' },
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
        inputs: [
            { name: 'poolId', type: 'uint256', internalType: 'uint256' },
            { name: 'rx', type: 'uint256', internalType: 'uint256' },
            { name: 'ry', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getNextReserveX',
        inputs: [
            { name: 'poolId', type: 'uint256', internalType: 'uint256' },
            { name: 'ry', type: 'uint256', internalType: 'uint256' },
            { name: 'L', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getNextReserveY',
        inputs: [
            { name: 'poolId', type: 'uint256', internalType: 'uint256' },
            { name: 'rx', type: 'uint256', internalType: 'uint256' },
            { name: 'L', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getReservesAndLiquidity',
        inputs: [{ name: 'poolId', type: 'uint256', internalType: 'uint256' }],
        outputs: [
            { name: '', type: 'uint256', internalType: 'uint256' },
            { name: '', type: 'uint256', internalType: 'uint256' },
            { name: '', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'internalPrice',
        inputs: [{ name: 'poolId', type: 'uint256', internalType: 'uint256' }],
        outputs: [{ name: 'price', type: 'uint256', internalType: 'uint256' }],
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
        name: 'prepareWeightXUpdate',
        inputs: [
            { name: 'targetWeightX', type: 'uint256', internalType: 'uint256' },
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
            { name: 'swapXIn', type: 'bool', internalType: 'bool' },
            { name: 'amountIn', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [
            { name: '', type: 'bool', internalType: 'bool' },
            { name: '', type: 'uint256', internalType: 'uint256' },
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
    {
        type: 'error',
        name: 'BisectionLib_InvalidBounds',
        inputs: [
            { name: 'lower', type: 'uint256', internalType: 'uint256' },
            { name: 'upper', type: 'uint256', internalType: 'uint256' },
        ],
    },
    {
        type: 'error',
        name: 'BisectionLib_RootOutsideBounds',
        inputs: [
            { name: 'lowerResult', type: 'int256', internalType: 'int256' },
            { name: 'upperResult', type: 'int256', internalType: 'int256' },
        ],
    },
] as const
