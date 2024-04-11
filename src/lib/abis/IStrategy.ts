export const IStrategyAbi = [
    {
        type: 'function',
        name: 'dfmm',
        inputs: [],
        outputs: [{ name: '', type: 'address', internalType: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'getPoolParams',
        inputs: [
            {
                name: 'poolId',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [{ name: 'params', type: 'bytes', internalType: 'bytes' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'init',
        inputs: [
            {
                name: 'sender',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'poolId',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'pool',
                type: 'tuple',
                internalType: 'struct Pool',
                components: [
                    {
                        name: 'strategy',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'tokens',
                        type: 'address[]',
                        internalType: 'address[]',
                    },
                    {
                        name: 'reserves',
                        type: 'uint256[]',
                        internalType: 'uint256[]',
                    },
                    {
                        name: 'totalLiquidity',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'liquidityToken',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'feeCollector',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'controllerFee',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
            { name: 'data', type: 'bytes', internalType: 'bytes' },
        ],
        outputs: [
            { name: 'valid', type: 'bool', internalType: 'bool' },
            {
                name: 'invariant',
                type: 'int256',
                internalType: 'int256',
            },
            {
                name: 'reserves',
                type: 'uint256[]',
                internalType: 'uint256[]',
            },
            {
                name: 'totalLiquidity',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'name',
        inputs: [],
        outputs: [{ name: '', type: 'string', internalType: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'tradingFunction',
        inputs: [
            {
                name: 'reserves',
                type: 'uint256[]',
                internalType: 'uint256[]',
            },
            {
                name: 'totalLiquidity',
                type: 'uint256',
                internalType: 'uint256',
            },
            { name: 'params', type: 'bytes', internalType: 'bytes' },
        ],
        outputs: [{ name: '', type: 'int256', internalType: 'int256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'update',
        inputs: [
            {
                name: 'sender',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'poolId',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'pool',
                type: 'tuple',
                internalType: 'struct Pool',
                components: [
                    {
                        name: 'strategy',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'tokens',
                        type: 'address[]',
                        internalType: 'address[]',
                    },
                    {
                        name: 'reserves',
                        type: 'uint256[]',
                        internalType: 'uint256[]',
                    },
                    {
                        name: 'totalLiquidity',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'liquidityToken',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'feeCollector',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'controllerFee',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
            { name: 'data', type: 'bytes', internalType: 'bytes' },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'validateAllocate',
        inputs: [
            {
                name: 'sender',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'poolId',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'pool',
                type: 'tuple',
                internalType: 'struct Pool',
                components: [
                    {
                        name: 'strategy',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'tokens',
                        type: 'address[]',
                        internalType: 'address[]',
                    },
                    {
                        name: 'reserves',
                        type: 'uint256[]',
                        internalType: 'uint256[]',
                    },
                    {
                        name: 'totalLiquidity',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'liquidityToken',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'feeCollector',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'controllerFee',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
            { name: 'data', type: 'bytes', internalType: 'bytes' },
        ],
        outputs: [
            { name: 'valid', type: 'bool', internalType: 'bool' },
            {
                name: 'invariant',
                type: 'int256',
                internalType: 'int256',
            },
            {
                name: 'deltas',
                type: 'uint256[]',
                internalType: 'uint256[]',
            },
            {
                name: 'deltaLiquidity',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'validateDeallocate',
        inputs: [
            {
                name: 'sender',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'poolId',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'pool',
                type: 'tuple',
                internalType: 'struct Pool',
                components: [
                    {
                        name: 'strategy',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'tokens',
                        type: 'address[]',
                        internalType: 'address[]',
                    },
                    {
                        name: 'reserves',
                        type: 'uint256[]',
                        internalType: 'uint256[]',
                    },
                    {
                        name: 'totalLiquidity',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'liquidityToken',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'feeCollector',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'controllerFee',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
            { name: 'data', type: 'bytes', internalType: 'bytes' },
        ],
        outputs: [
            { name: 'valid', type: 'bool', internalType: 'bool' },
            {
                name: 'invariant',
                type: 'int256',
                internalType: 'int256',
            },
            {
                name: 'deltas',
                type: 'uint256[]',
                internalType: 'uint256[]',
            },
            {
                name: 'deltaLiquidity',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'validateSwap',
        inputs: [
            {
                name: 'sender',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'poolId',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'pool',
                type: 'tuple',
                internalType: 'struct Pool',
                components: [
                    {
                        name: 'strategy',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'tokens',
                        type: 'address[]',
                        internalType: 'address[]',
                    },
                    {
                        name: 'reserves',
                        type: 'uint256[]',
                        internalType: 'uint256[]',
                    },
                    {
                        name: 'totalLiquidity',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'liquidityToken',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'feeCollector',
                        type: 'address',
                        internalType: 'address',
                    },
                    {
                        name: 'controllerFee',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                ],
            },
            { name: 'data', type: 'bytes', internalType: 'bytes' },
        ],
        outputs: [
            { name: 'valid', type: 'bool', internalType: 'bool' },
            {
                name: 'invariant',
                type: 'int256',
                internalType: 'int256',
            },
            {
                name: 'tokenInIndex',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'tokenOutIndex',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'amountIn',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'amountOut',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'deltaLiquidity',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'error',
        name: 'DeltaError',
        inputs: [
            {
                name: 'expected',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'actual',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
    },
    { type: 'error', name: 'InvalidReservesLength', inputs: [] },
    { type: 'error', name: 'InvalidSender', inputs: [] },
    { type: 'error', name: 'InvalidUpdateCode', inputs: [] },
    { type: 'error', name: 'NotDFMM', inputs: [] },
]
