export const rmmABI = [
    {
        type: 'constructor',
        inputs: [
            { name: 'weth_', type: 'address', internalType: 'address' },
            { name: 'name_', type: 'string', internalType: 'string' },
            { name: 'symbol_', type: 'string', internalType: 'string' },
        ],
        stateMutability: 'nonpayable',
    },
    { type: 'receive', stateMutability: 'payable' },
    {
        type: 'function',
        name: 'BURNT_LIQUIDITY',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'DOMAIN_SEPARATOR',
        inputs: [],
        outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'IMPLIED_RATE_TIME',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'INIT_UPPER_BOUND',
        inputs: [],
        outputs: [{ name: '', type: 'int256', internalType: 'int256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'PT',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'address',
                internalType: 'contract IPPrincipalToken',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'SY',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'address',
                internalType: 'contract IStandardizedYield',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'WETH',
        inputs: [],
        outputs: [{ name: '', type: 'address', internalType: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'YT',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'address',
                internalType: 'contract IPYieldToken',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'allocate',
        inputs: [
            { name: 'deltaX', type: 'uint256', internalType: 'uint256' },
            { name: 'deltaY', type: 'uint256', internalType: 'uint256' },
            {
                name: 'minLiquidityOut',
                type: 'uint256',
                internalType: 'uint256',
            },
            { name: 'to', type: 'address', internalType: 'address' },
        ],
        outputs: [
            {
                name: 'deltaLiquidity',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'allowance',
        inputs: [
            { name: '', type: 'address', internalType: 'address' },
            { name: '', type: 'address', internalType: 'address' },
        ],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'approve',
        inputs: [
            { name: 'spender', type: 'address', internalType: 'address' },
            { name: 'amount', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'approxSpotPrice',
        inputs: [
            { name: 'totalAsset', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'balanceOf',
        inputs: [{ name: '', type: 'address', internalType: 'address' }],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'computeKGivenLastPrice',
        inputs: [
            { name: 'reserveX_', type: 'uint256', internalType: 'uint256' },
            { name: 'liquidity', type: 'uint256', internalType: 'uint256' },
            { name: 'sigma_', type: 'uint256', internalType: 'uint256' },
            { name: 'tau_', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'computeSYToYT',
        inputs: [
            { name: 'index', type: 'uint256', internalType: 'PYIndex' },
            { name: 'exactSYIn', type: 'uint256', internalType: 'uint256' },
            { name: 'blockTime', type: 'uint256', internalType: 'uint256' },
            { name: 'initialGuess', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'computeTokenToYt',
        inputs: [
            { name: 'index', type: 'uint256', internalType: 'PYIndex' },
            { name: 'token', type: 'address', internalType: 'address' },
            { name: 'exactTokenIn', type: 'uint256', internalType: 'uint256' },
            { name: 'blockTime', type: 'uint256', internalType: 'uint256' },
            { name: 'initialGuess', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [
            {
                name: 'amountSyMinted',
                type: 'uint256',
                internalType: 'uint256',
            },
            { name: 'amountYtOut', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'curator',
        inputs: [],
        outputs: [{ name: '', type: 'address', internalType: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'currentTau',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'deallocate',
        inputs: [
            {
                name: 'deltaLiquidity',
                type: 'uint256',
                internalType: 'uint256',
            },
            { name: 'minDeltaXOut', type: 'uint256', internalType: 'uint256' },
            { name: 'minDeltaYOut', type: 'uint256', internalType: 'uint256' },
            { name: 'to', type: 'address', internalType: 'address' },
        ],
        outputs: [
            { name: 'deltaX', type: 'uint256', internalType: 'uint256' },
            { name: 'deltaY', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'decimals',
        inputs: [],
        outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'fee',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'futureTau',
        inputs: [
            { name: 'timestamp', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'init',
        inputs: [
            { name: 'PT_', type: 'address', internalType: 'address' },
            { name: 'priceX', type: 'uint256', internalType: 'uint256' },
            { name: 'amountX', type: 'uint256', internalType: 'uint256' },
            { name: 'strike_', type: 'uint256', internalType: 'uint256' },
            { name: 'sigma_', type: 'uint256', internalType: 'uint256' },
            { name: 'fee_', type: 'uint256', internalType: 'uint256' },
            { name: 'curator_', type: 'address', internalType: 'address' },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'initTimestamp',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'lastImpliedPrice',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'lastTau',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'lastTimestamp',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'lock_',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'maturity',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'mintSY',
        inputs: [
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
        type: 'function',
        name: 'name',
        inputs: [],
        outputs: [{ name: '', type: 'string', internalType: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'nonces',
        inputs: [{ name: '', type: 'address', internalType: 'address' }],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'permit',
        inputs: [
            { name: 'owner', type: 'address', internalType: 'address' },
            { name: 'spender', type: 'address', internalType: 'address' },
            { name: 'value', type: 'uint256', internalType: 'uint256' },
            { name: 'deadline', type: 'uint256', internalType: 'uint256' },
            { name: 'v', type: 'uint8', internalType: 'uint8' },
            { name: 'r', type: 'bytes32', internalType: 'bytes32' },
            { name: 's', type: 'bytes32', internalType: 'bytes32' },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'prepareAllocate',
        inputs: [
            { name: 'deltaX', type: 'uint256', internalType: 'uint256' },
            { name: 'deltaY', type: 'uint256', internalType: 'uint256' },
            { name: 'index', type: 'uint256', internalType: 'PYIndex' },
        ],
        outputs: [
            { name: 'deltaXWad', type: 'uint256', internalType: 'uint256' },
            { name: 'deltaYWad', type: 'uint256', internalType: 'uint256' },
            {
                name: 'deltaLiquidity',
                type: 'uint256',
                internalType: 'uint256',
            },
            { name: 'lptMinted', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'prepareDeallocate',
        inputs: [
            {
                name: 'deltaLiquidity',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            { name: 'deltaXWad', type: 'uint256', internalType: 'uint256' },
            { name: 'deltaYWad', type: 'uint256', internalType: 'uint256' },
            { name: 'lptBurned', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'prepareInit',
        inputs: [
            { name: 'priceX', type: 'uint256', internalType: 'uint256' },
            { name: 'totalAsset', type: 'uint256', internalType: 'uint256' },
            { name: 'strike_', type: 'uint256', internalType: 'uint256' },
            { name: 'sigma_', type: 'uint256', internalType: 'uint256' },
            { name: 'maturity_', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [
            {
                name: 'totalLiquidity_',
                type: 'uint256',
                internalType: 'uint256',
            },
            { name: 'amountY', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'preparePoolPreCompute',
        inputs: [
            { name: 'index', type: 'uint256', internalType: 'PYIndex' },
            { name: 'blockTime', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [
            {
                name: '',
                type: 'tuple',
                internalType: 'struct PoolPreCompute',
                components: [
                    {
                        name: 'reserveInAsset',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    {
                        name: 'strike_',
                        type: 'uint256',
                        internalType: 'uint256',
                    },
                    { name: 'tau_', type: 'uint256', internalType: 'uint256' },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'prepareSwapPtIn',
        inputs: [
            { name: 'ptIn', type: 'uint256', internalType: 'uint256' },
            { name: 'timestamp', type: 'uint256', internalType: 'uint256' },
            { name: 'index', type: 'uint256', internalType: 'PYIndex' },
        ],
        outputs: [
            { name: 'amountInWad', type: 'uint256', internalType: 'uint256' },
            { name: 'amountOutWad', type: 'uint256', internalType: 'uint256' },
            { name: 'amountOut', type: 'uint256', internalType: 'uint256' },
            { name: 'deltaLiquidity', type: 'int256', internalType: 'int256' },
            { name: 'strike_', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'prepareSwapSyForExactPt',
        inputs: [
            { name: 'ptOut', type: 'uint256', internalType: 'uint256' },
            { name: 'timestamp', type: 'uint256', internalType: 'uint256' },
            { name: 'index', type: 'uint256', internalType: 'PYIndex' },
        ],
        outputs: [
            { name: 'amountInWad', type: 'uint256', internalType: 'uint256' },
            { name: 'ptOutWad', type: 'uint256', internalType: 'uint256' },
            { name: 'amountIn', type: 'uint256', internalType: 'uint256' },
            { name: 'deltaLiquidity', type: 'int256', internalType: 'int256' },
            { name: 'strike_', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'prepareSwapSyIn',
        inputs: [
            { name: 'amountIn', type: 'uint256', internalType: 'uint256' },
            { name: 'timestamp', type: 'uint256', internalType: 'uint256' },
            { name: 'index', type: 'uint256', internalType: 'PYIndex' },
        ],
        outputs: [
            { name: 'amountInWad', type: 'uint256', internalType: 'uint256' },
            { name: 'amountOutWad', type: 'uint256', internalType: 'uint256' },
            { name: 'amountOut', type: 'uint256', internalType: 'uint256' },
            { name: 'deltaLiquidity', type: 'int256', internalType: 'int256' },
            { name: 'strike_', type: 'uint256', internalType: 'uint256' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'reserveX',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'reserveY',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'sigma',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'strike',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'swapExactPtForSy',
        inputs: [
            { name: 'amountIn', type: 'uint256', internalType: 'uint256' },
            { name: 'minAmountOut', type: 'uint256', internalType: 'uint256' },
            { name: 'to', type: 'address', internalType: 'address' },
        ],
        outputs: [
            { name: 'amountOut', type: 'uint256', internalType: 'uint256' },
            { name: 'deltaLiquidity', type: 'int256', internalType: 'int256' },
        ],
        stateMutability: 'payable',
    },
    {
        type: 'function',
        name: 'swapExactSyForPt',
        inputs: [
            { name: 'amountIn', type: 'uint256', internalType: 'uint256' },
            { name: 'minAmountOut', type: 'uint256', internalType: 'uint256' },
            { name: 'to', type: 'address', internalType: 'address' },
        ],
        outputs: [
            { name: 'amountOut', type: 'uint256', internalType: 'uint256' },
            { name: 'deltaLiquidity', type: 'int256', internalType: 'int256' },
        ],
        stateMutability: 'payable',
    },
    {
        type: 'function',
        name: 'swapExactSyForYt',
        inputs: [
            { name: 'amountIn', type: 'uint256', internalType: 'uint256' },
            { name: 'minAmountOut', type: 'uint256', internalType: 'uint256' },
            { name: 'to', type: 'address', internalType: 'address' },
        ],
        outputs: [
            { name: 'amountOut', type: 'uint256', internalType: 'uint256' },
            { name: 'deltaLiquidity', type: 'int256', internalType: 'int256' },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'swapExactTokenForYt',
        inputs: [
            { name: 'token', type: 'address', internalType: 'address' },
            { name: 'amountTokenIn', type: 'uint256', internalType: 'uint256' },
            {
                name: 'amountPtForFlashSwap',
                type: 'uint256',
                internalType: 'uint256',
            },
            { name: 'minSyMinted', type: 'uint256', internalType: 'uint256' },
            { name: 'minYtOut', type: 'uint256', internalType: 'uint256' },
            { name: 'to', type: 'address', internalType: 'address' },
        ],
        outputs: [
            { name: 'amountOut', type: 'uint256', internalType: 'uint256' },
            { name: 'deltaLiquidity', type: 'int256', internalType: 'int256' },
        ],
        stateMutability: 'payable',
    },
    {
        type: 'function',
        name: 'swapExactYtForSy',
        inputs: [
            { name: 'ytIn', type: 'uint256', internalType: 'uint256' },
            { name: 'maxSyIn', type: 'uint256', internalType: 'uint256' },
            { name: 'to', type: 'address', internalType: 'address' },
        ],
        outputs: [
            { name: 'amountOut', type: 'uint256', internalType: 'uint256' },
            { name: 'amountIn', type: 'uint256', internalType: 'uint256' },
            { name: 'deltaLiquidity', type: 'int256', internalType: 'int256' },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'symbol',
        inputs: [],
        outputs: [{ name: '', type: 'string', internalType: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'totalLiquidity',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'totalSupply',
        inputs: [],
        outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'tradingFunction',
        inputs: [{ name: 'index', type: 'uint256', internalType: 'PYIndex' }],
        outputs: [{ name: '', type: 'int256', internalType: 'int256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'transfer',
        inputs: [
            { name: 'to', type: 'address', internalType: 'address' },
            { name: 'amount', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'transferFrom',
        inputs: [
            { name: 'from', type: 'address', internalType: 'address' },
            { name: 'to', type: 'address', internalType: 'address' },
            { name: 'amount', type: 'uint256', internalType: 'uint256' },
        ],
        outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'version',
        inputs: [],
        outputs: [{ name: '', type: 'string', internalType: 'string' }],
        stateMutability: 'pure',
    },
    {
        type: 'event',
        name: 'Allocate',
        inputs: [
            {
                name: 'caller',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'to',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'deltaX',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'deltaY',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'deltaLiquidity',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'Approval',
        inputs: [
            {
                name: 'owner',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'spender',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'Deallocate',
        inputs: [
            {
                name: 'caller',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'to',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'deltaX',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'deltaY',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'deltaLiquidity',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'Init',
        inputs: [
            {
                name: 'caller',
                type: 'address',
                indexed: false,
                internalType: 'address',
            },
            {
                name: 'tokenX',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'tokenY',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'reserveX',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'reserveY',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'totalLiquidity',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'strike',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'sigma',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'fee',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'maturity',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'curator',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'Swap',
        inputs: [
            {
                name: 'caller',
                type: 'address',
                indexed: false,
                internalType: 'address',
            },
            {
                name: 'to',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'tokenIn',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'tokenOut',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'amountIn',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'amountOut',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'deltaLiquidity',
                type: 'int256',
                indexed: false,
                internalType: 'int256',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'Transfer',
        inputs: [
            {
                name: 'from',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'to',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        anonymous: false,
    },
    { type: 'error', name: 'AlreadyInitialized', inputs: [] },
    { type: 'error', name: 'BalanceError', inputs: [] },
    {
        type: 'error',
        name: 'ExcessInput',
        inputs: [
            { name: 'amountOut', type: 'uint256', internalType: 'uint256' },
            { name: 'maxAmountIn', type: 'uint256', internalType: 'uint256' },
            { name: 'amountIn', type: 'uint256', internalType: 'uint256' },
        ],
    },
    { type: 'error', name: 'Infinity', inputs: [] },
    {
        type: 'error',
        name: 'InsufficientLiquidityOut',
        inputs: [
            { name: 'deltaX', type: 'uint256', internalType: 'uint256' },
            { name: 'deltaY', type: 'uint256', internalType: 'uint256' },
            { name: 'minLiquidity', type: 'uint256', internalType: 'uint256' },
            { name: 'liquidity', type: 'uint256', internalType: 'uint256' },
        ],
    },
    {
        type: 'error',
        name: 'InsufficientOutput',
        inputs: [
            { name: 'amountIn', type: 'uint256', internalType: 'uint256' },
            { name: 'minAmountOut', type: 'uint256', internalType: 'uint256' },
            { name: 'amountOut', type: 'uint256', internalType: 'uint256' },
        ],
    },
    {
        type: 'error',
        name: 'InsufficientPayment',
        inputs: [
            { name: 'token', type: 'address', internalType: 'address' },
            { name: 'actual', type: 'uint256', internalType: 'uint256' },
            { name: 'expected', type: 'uint256', internalType: 'uint256' },
        ],
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
        name: 'InvalidAllocate',
        inputs: [
            { name: 'deltaX', type: 'uint256', internalType: 'uint256' },
            { name: 'deltaY', type: 'uint256', internalType: 'uint256' },
            { name: 'currLiquidity', type: 'uint256', internalType: 'uint256' },
            { name: 'nextLiquidity', type: 'uint256', internalType: 'uint256' },
        ],
    },
    { type: 'error', name: 'InvalidStrike', inputs: [] },
    {
        type: 'error',
        name: 'InvalidTokenIn',
        inputs: [{ name: 'tokenIn', type: 'address', internalType: 'address' }],
    },
    { type: 'error', name: 'Min', inputs: [] },
    { type: 'error', name: 'NegativeInfinity', inputs: [] },
    { type: 'error', name: 'OutOfBounds', inputs: [] },
    {
        type: 'error',
        name: 'OutOfRange',
        inputs: [
            { name: 'initial', type: 'int256', internalType: 'int256' },
            { name: 'terminal', type: 'int256', internalType: 'int256' },
        ],
    },
    {
        type: 'error',
        name: 'PaymentFailed',
        inputs: [
            { name: 'token', type: 'address', internalType: 'address' },
            { name: 'from', type: 'address', internalType: 'address' },
            { name: 'to', type: 'address', internalType: 'address' },
            { name: 'amount', type: 'uint256', internalType: 'uint256' },
        ],
    },
    { type: 'error', name: 'Reentrancy', inputs: [] },
]
