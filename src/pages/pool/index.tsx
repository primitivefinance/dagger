import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import {
    useAccount,
    useChainId,
    useReadContract,
    useWaitForTransactionReceipt,
    useWatchPendingTransactions,
    useWriteContract,
} from 'wagmi'

import { tokens } from '../../data/tokens'
import { shortAddress } from '../../utils/address'
import { allowance, balanceOf, totalSupply } from '../../lib/erc20'
import { useGraphQL } from '../../useGraphQL'
import {
    PoolWithTokensFragment,
    poolInfoQueryDocument,
} from '../../queries/pools'
import { useFragment } from '../../gql'
import {
    csParamsQueryDocument,
    lNParamsQueryDocument,
    nGParamsQueryDocument,
} from '../../queries/parameters'
import { type UseWriteContractParameters } from 'wagmi'

import TokenAmountInput from '@/components/TokenAmountInput'
import TransactionTable from '@/components/TransactionTable'

const LinkIcon = () => (
    <svg
        className="w-3 h-3 self-center"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <path
            className="text-blue-600"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2"
        />
    </svg>
)

function Overview({ pool }: { pool?: PoolWithTokensFragment }): JSX.Element {
    const chainId = useChainId()

    return (
        <section id="overview">
            <div className="flex flex-col gap-xl">
                <div className="rounded-full size-3xl bg-gray-900 flex">
                    {pool?.logo ? (
                        <img
                            src={pool?.logo}
                            alt={pool?.symbol ?? 'token icon'}
                            className="dark:invert items-center justify-center m-auto h-16 pl-3"
                            style={{
                                zIndex: 1,
                            }}
                        />
                    ) : (
                        <QuestionMarkIcon className="w-full h-full p-6" />
                    )}
                </div>

                <div className="flex flex-row items-start gap-lg w-full">
                    <div className="flex flex-col gap-sm w-1/2">
                        <h2>{pool?.name ?? 'na'}</h2>
                        <p className="text-muted-foreground dark:text-muted-foreground">
                            The overview page provides a high-level summary of
                            the pool&#39;s details and statistics. It also
                            provides a list of recent transactions and actions
                            taken by users.
                        </p>
                    </div>
                    <div className="flex flex-col gap-md items-end w-1/2">
                        <h4>Asset Universe</h4>
                        <div className="flex flex-row items-center ">
                            {pool?.poolTokens?.items?.map(
                                (poolToken: PoolToken) => {
                                    return (
                                        <TokenLogo
                                            key={poolToken.id}
                                            chainId={chainId}
                                            address={
                                                poolToken?.token
                                                    ?.id as `0x${string}`
                                            }
                                        />
                                    )
                                }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

type PoolInfoItem = {
    key: React.ReactNode
    value: React.ReactNode
}

function PoolInfo({
    pool,
    items = [],
    title = 'Pool Info',
}: {
    pool: PoolWithTokensFragment
    items?: PoolInfoItem[]
    title?: string
}): JSX.Element {
    const poolType = getPoolType(pool)

    const [lpTokenSupply, setLpTokenSupply] = useState<bigint>(BigInt(0))

    useEffect(() => {
        async function fetchLpTokenSupply(): Promise<void> {
            const supply = await totalSupply(pool.lpToken)
            setLpTokenSupply(supply)
        }

        if (pool.lpToken) {
            fetchLpTokenSupply()
        }
    }, [])

    items = [
        {
            key: 'Name',
            value: (
                <LabelWithEtherscan label={pool.name} address={pool.lpToken} />
            ),
        },

        {
            key: 'Strategy',
            value: (
                <LabelWithEtherscan
                    label={pool.strategy.name}
                    address={
                        poolType == PoolTypes.nTokenGeometricMean
                            ? nG3mStrategy
                            : nG3mStrategy
                    }
                />
            ),
        },
        {
            key: 'Curator',
            value: (
                <LabelWithEtherscan
                    label={
                        pool.strategy.controller == zeroAddress ||
                        !pool.strategy.controller
                            ? 'None'
                            : 'Curated'
                    }
                    address={pool.strategy.controller ?? zeroAddress}
                />
            ),
        },
        {
            key: 'Protocol',
            value: (
                <LabelWithEtherscan
                    label={'DFMM v0.2.0'}
                    address={dfmmAddress as `0x${string}`}
                />
            ),
        },
        {
            key: 'Tokens',
            value: pool.poolTokens.items.map((poolToken: PoolToken) => {
                return (
                    <LabelWithEtherscan
                        key={poolToken.token.id}
                        label={poolToken.token.symbol}
                        address={poolToken.token.id as `0x${string}`}
                    />
                )
            }),
        },

        {
            key: 'Ticker',
            value: 'TODO',
        },
        {
            key: 'Pool #',
            value: pool.id,
        },
        {
            key: 'Created',
            value: new Date(pool.initTimestamp * 1000).toISOString(),
        },
        {
            key: 'Total Supply',
            value: <p className="text-sm">{formatWad(lpTokenSupply)}</p>,
        },
    ]

    const firstColumnLength = Math.max(items.length / 2)
    return (
        <section id="pool-info">
            <div className="flex flex-row w-full gap-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <h5 className="text-primary">{title}</h5>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items?.map((item, i) => {
                            if (i < firstColumnLength) {
                                return (
                                    <TableRow key={i}>
                                        <TableHead>{item.key}</TableHead>
                                        <TableCell>{item.value}</TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                        <TableRow></TableRow>
                    </TableBody>
                </Table>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items?.map((item, i) => {
                            if (i >= firstColumnLength) {
                                return (
                                    <TableRow key={i}>
                                        <TableHead>{item.key}</TableHead>
                                        <TableCell>{item.value}</TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                        <TableRow></TableRow>
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}

function NTokenGeometricMeanWeights({
    pool,
}: {
    pool?: PoolWithTokensFragment
}): JSX.Element {
    const { data } = useGraphQL(nGParamsQueryDocument, { id: pool.id })
    const params = data?.nTokenGeometricMeanParams

    return (
        <TableBody>
            {pool &&
                params?.lastComputedWeights.map((weight, i) => {
                    const poolToken = pool.poolTokens.items[i]
                    const reserve = pool.reserves[i]

                    return (
                        <TableRow key={poolToken.id}>
                            <TableCell>{formatWadPercentage(weight)}</TableCell>
                            <TableCell>{poolToken?.token?.symbol}</TableCell>
                            <TableCell>{formatNumber(reserve)}</TableCell>
                            <TableCell>todo</TableCell>
                        </TableRow>
                    )
                })}
        </TableBody>
    )
}

function PoolBreakdown({
    pool,
}: {
    pool?: PoolWithTokensFragment
}): JSX.Element {
    const poolType = getPoolType(pool)

    return (
        <section id="pool-breakdown">
            <div className="flex flex-row w-full gap-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <h5 className="text-primary">Pool Breakdown</h5>
                            </TableHead>
                        </TableRow>
                        <TableRow>
                            <TableHead>Weight %</TableHead>
                            <TableHead>Token</TableHead>
                            <TableHead>Holdings</TableHead>
                            <TableHead>Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    {poolType === PoolTypes.nTokenGeometricMean ? (
                        <NTokenGeometricMeanWeights pool={pool} />
                    ) : (
                        <NTokenGeometricMeanWeights pool={pool} />
                    )}
                </Table>
            </div>
        </section>
    )
}

function RecentTransactions({
    pool,
}: {
    pool?: PoolWithTokensFragment
}): JSX.Element {
    return (
        <section id="recent-transactions">
            <div className="flex flex-row w-full gap-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <h5 className="text-primary">
                                    Recent Transactions
                                </h5>
                            </TableHead>
                        </TableRow>
                        <TableRow>
                            <TableHead>Action</TableHead>
                            <TableHead>Token</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead>Account</TableHead>
                            <TableHead>Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Add Liquidity</TableCell>
                            <TableCell>ETH</TableCell>
                            <TableCell>1.432</TableCell>
                            <TableCell>2,414.42</TableCell>
                            <TableCell>0xbeef...cafe</TableCell>
                            <TableCell>3 hours ago</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}

function computeAllocationDeltasGivenDeltaT(
    deltaT: number,
    indexT: number,
    reserves: number[],
    liquidity: number
): { reserveDeltas: number[]; deltaL: number } {
    const a = deltaT / reserves[indexT]
    const reserveDeltas = []
    reserveDeltas[indexT] = deltaT

    for (let i = 0; i < reserves.length; i++) {
        if (i !== indexT) {
            reserveDeltas[i] = a * reserves[i]
        }
    }

    const deltaL = a * liquidity
    return { reserveDeltas, deltaL }
}

function TransactionView({
    selectedTokens,
    pool,
    balanceMapping,
}): JSX.Element {
    const { address } = useAccount()
    const chainId = useChainId()
    const [amount, setAmount] = useState<string>('')
    const [dependentAmounts, setDependentAmounts] = useState<{
        reserveDeltas: number[]
        deltaL: number
    }>()

    const [allowances, setAllowances] = useState<{ [key: string]: number }>({})

    useEffect(() => {
        async function fetchAllowances(): Promise<void> {
            if (!selectedTokens || selectedTokens.length === 0) {
                return
            }

            const newAllowances: { [key: string]: number } = {}
            for (const token of selectedTokens) {
                newAllowances[token] = await allowance(
                    token,
                    address!,
                    dfmmAddress
                )
            }
            setAllowances(newAllowances)
        }

        fetchAllowances()
    }, [selectedTokens, address])

    const depositAll = true // todo: make conditional once single sided deposits are available

    const computeDependentAmounts = useCallback(() => {
        const indexOfIndependent = pool.poolTokens.items.findIndex(
            (pt) => pt.token.id === selectedTokens[0]
        )

        const { reserveDeltas, deltaL } = computeAllocationDeltasGivenDeltaT(
            parseFloat(amount),
            indexOfIndependent,
            pool.reserves,
            pool.liquidity
        )

        return {
            reserveDeltas,
            deltaL,
        }
    }, [selectedTokens, amount, setAmount])

    useEffect(() => {
        if (amount) {
            setDependentAmounts(computeDependentAmounts())
        }
    }, [amount, setAmount, computeDependentAmounts])

    const [isUSD, setIsUSD] = useState<boolean>(false)
    const { toast } = useToast()

    const {
        writeContract: executeAllocate,
        isPending: allocatePending,
        isError: allocateFail,
        isSuccess: allocateSent,
        failureReason: allocationFailureReason,
        reset: resetAllocate,
    } = useWriteContract({
        config,
        mutation: {
            onSuccess: (res) => {
                const hash = res // Capture the transaction hash
                console.log('Transaction sent:', hash)
                // Display initial toast with transaction hash
                toast({
                    title: 'Transaction sent',
                    description: `Transaction hash: ${hash}`,
                    // You can add an action to copy the hash or open it in Etherscan
                })
                // Proceed to watch for the transaction receipt
                waitForTransactionReceipt(config, {
                    hash: hash,
                    confirmations: 1,
                })
            },
            onError: (err) => {
                console.error(err)
                toast({
                    variant: 'destructive',
                    title: 'Uh oh! Something went wrong.',
                    description:
                        'There was a problem with your allocation request: ' +
                        err.name,
                    action: (
                        <ToastAction
                            altText="Try again"
                            onClick={resetAllocate}
                        >
                            Try again
                        </ToastAction>
                    ),
                })
            },
        },
    })

    const [simulatedResult, setSimulatedResult] = useState<any>(undefined)
    const [simulating, setSimulating] = useState<boolean>(false)

    const [payloadToExecute, setPayloadToExecute] = useState<
        string | undefined
    >(undefined)

    const { data: poolsSnapshot } = useReadContract({
        abi: dfmmABI,
        address: dfmmAddress,
        functionName: 'pools',
        args: [pool.id],
    })

    useEffect(() => {
        if (!poolsSnapshot || !amount || parseFloat(amount) === 0) {
            setPayloadToExecute(undefined)
            return
        }

        const deltaT = parseFloat(amount)
        const deltas = poolsSnapshot.reserves.map((_, i) => toWad(deltaT))
        // todo: assumes equal weights...
        const liquidity =
            (toWad(deltaT) * BigInt(poolsSnapshot.totalLiquidity)) /
                BigInt(poolsSnapshot.reserves[0]) -
            10n // 10n because the computation is slightly off from rounding, so the rounded token amounts expect less liquidity

        const payload = encodeAbiParameters(
            parseAbiParameters('uint256[], uint256'),
            [deltas, liquidity]
        )

        setPayloadToExecute(payload)
    }, [poolsSnapshot, amount])

    async function prepareAllocate(): Promise<void> {
        if (!selectedTokens || selectedTokens.length === 0) {
            return
        }

        if (!address) {
            return
        }

        if (!amount || parseFloat(amount) === 0) {
            return
        }

        // Need the pool id, token index, and amount.
        const poolId = pool.id
        const tokenIndex = pool.poolTokens.items.findIndex(
            (pt) => pt.token.id === selectedTokens[0]
        )
        const deltaT = parseFloat(amount)

        const result = await readContract(config, {
            abi: nG3mSolverAbi,
            address: nG3mSolver,
            functionName: 'getAllocationDeltasGivenDeltaT',
            args: [poolId, tokenIndex, toWad(deltaT)],
        })

        const poolsSnapshot = await readContract(config, {
            abi: dfmmABI,
            address: dfmmAddress,
            functionName: 'pools',
            args: [poolId],
        })

        const deltas = poolsSnapshot.reserves.map((_, i) => toWad(deltaT))
        // todo: assumes equal weights...
        const liquidity =
            (toWad(deltaT) * BigInt(poolsSnapshot.totalLiquidity)) /
                BigInt(poolsSnapshot.reserves[0]) -
            10n // 10n because the computation is slightly off from rounding, so the rounded token amounts expect less liquidity

        const payload = encodeAbiParameters(
            parseAbiParameters('uint256[], uint256'),
            [deltas, liquidity]
        )

        function computeAllowanceSlot(
            slot: number,
            owner: Address,
            spender: Address
        ): Hex {
            return keccak256(
                encodePacked(
                    ['bytes32', 'bytes32'],
                    [
                        padHex(spender, { size: 32 }),
                        keccak256(
                            encodePacked(
                                ['bytes32', 'uint'],
                                [padHex(owner, { size: 32 }), BigInt(slot)]
                            )
                        ),
                    ]
                )
            )
        }

        let txResult
        const ERC20_ALLOWANCE_SLOT = 4
        const owner = address
        const spender = dfmmAddress
        const maxAllowance = numberToHex(maxUint256)

        function computeReservesStorageSlot(
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
        }

        computeReservesStorageSlot(poolId, 0)

        try {
            setSimulating(true)
            txResult = await simulateContract(config, {
                abi: dfmmABI,
                address: dfmmAddress,
                functionName: 'allocate',
                args: [poolId, payload],
                stateOverride: poolsSnapshot?.tokens.map((token) => {
                    return {
                        address: token,
                        stateDiff: [
                            {
                                slot: computeAllowanceSlot(
                                    ERC20_ALLOWANCE_SLOT,
                                    owner,
                                    spender
                                ),
                                value: maxAllowance,
                            },
                        ],
                    }
                }),
            })
            console.log({ txResult })
        } catch (err) {
            console.error(err)
            if (err instanceof BaseError) {
                const revertError = err.walk(
                    (err) => err instanceof ContractFunctionRevertedError
                )
                if (revertError instanceof ContractFunctionRevertedError) {
                    const errorName = revertError.data?.errorName ?? ''
                    // do something with `errorName`
                    console.error({ errorName })
                }
            }
        }

        if (txResult) {
            setPayloadToExecute(payload)
            setSimulating(false)
            setSimulatedResult(txResult)
        }
    }

    const ApprovalAction = () => {
        if (approvalError) {
            return <span className="text-red-500">Approval failed</span>
        }

        if (approvalSuccess) {
            return <span className="text-green-200">Approval sent</span>
        }

        if (isApproving) {
            return <span>Approving...</span>
        }

        return <span>Approve</span>
    }

    const ExecuteAction = () => {
        if (allocateFail) {
            return (
                <span className="text-red-500">
                    Allocation failed{' '}
                    <small>{allocationFailureReason?.name}</small>
                </span>
            )
        }

        if (allocateSent) {
            return <span className="text-green-200">Allocation sent</span>
        }

        if (allocatePending) {
            return <span>Allocating...</span>
        }

        return <span>Allocate</span>
    }

    enum TransactionPhase {
        Simulate,
        Approve,
        Execute,
        Done,
    }

    const remainingAllowances = Object.keys(allowances).filter(
        (key) =>
            parseFloat(formatUnits(allowances[key], 18)) < parseFloat(amount)
    )

    const { setTxHash: setTx, txReceipt, txHash } = useTransactionStatus({})
    const [successfulReceipts, setSuccessfulReceipts] = useState<any[]>([])

    // Upon receiving a txReceipt, reset the form.
    useEffect(() => {
        if (typeof txReceipt !== 'undefined') {
            setAmount('')
            setDependentAmounts(undefined)
            setPayloadToExecute(undefined)
            setSuccessfulReceipts((prev) => [...prev, txReceipt])
        }
    }, [txReceipt])

    const TransactionAction = ({ phase }: { phase: TransactionPhase }) => {
        switch (phase) {
            case TransactionPhase.Simulate:
                return (
                    <AllocateTransaction
                        poolId={pool.id}
                        payload={payloadToExecute}
                        setTxHash={setTx}
                        txHash={txHash as `0x${string}`}
                        txReceipt={txReceipt}
                    />
                )
            case TransactionPhase.Approve:
                return (
                    <ApproveTransaction
                        token={remainingAllowances?.[0] as `0x${string}`}
                        amount={amount}
                        setTxHash={setTx}
                        txHash={txHash as `0x${string}`}
                        txReceipt={txReceipt}
                    />
                )
            case TransactionPhase.Execute:
                return (
                    <Button
                        onClick={() =>
                            executeAllocate({
                                abi: dfmmABI,
                                address: dfmmAddress,
                                functionName: 'allocate',
                                args: [pool.id, payloadToExecute!],
                            })
                        }
                    >
                        <ExecuteAction />
                    </Button>
                )
            case TransactionPhase.Done:
                return (
                    <Button
                        onClick={async () => {
                            // allocate
                            await prepareAllocate()
                        }}
                    >
                        Done
                    </Button>
                )
        }
    }

    return (
        <Sheet>
            <SheetTrigger className="bg-blue-600 rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 w-full">
                Deposit{' '}
                {selectedTokens
                    ?.map(
                        (t) =>
                            pool.poolTokens.items.filter(
                                (pt) => pt.token.id === t
                            )[0]?.token.symbol
                    )
                    .join(', ')}
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader className="max-w-4xl mx-auto justify-center flex flex-col gap-sm">
                    <SheetTitle>
                        Deposit{' '}
                        {selectedTokens
                            ?.map(
                                (t) =>
                                    pool.poolTokens.items.filter(
                                        (pt) => pt.token.id === t
                                    )[0]?.token.symbol
                            )
                            .join(', ')}{' '}
                        to {pool.name}
                    </SheetTitle>
                    <SheetDescription>
                        Deposit tokens into a pool to mint liquidity tokens.
                    </SheetDescription>
                </SheetHeader>
                <div className="max-w-4xl my-8 mx-auto justify-center flex flex-row gap-md">
                    <div
                        id="deposit-form"
                        className="flex flex-col gap-sm w-1/2"
                    >
                        <div className="flex flex-row gap-md justify-between w-full">
                            <p>Amount</p>
                            <div className="flex flex-row gap-sm items-center">
                                <Label
                                    htmlFor="currency-mode"
                                    className={`${!isUSD ? '' : 'dark:text-muted-foreground'}`}
                                >
                                    {pool?.poolTokens?.items?.find(
                                        (pt) =>
                                            pt.token.id === selectedTokens[0]
                                    )?.token.symbol || 'Asset'}
                                </Label>
                                <Switch
                                    id="currency-mode"
                                    checked={isUSD}
                                    onCheckedChange={() => setIsUSD(!isUSD)}
                                />
                                <Label
                                    htmlFor="currency-mode"
                                    className={`${isUSD ? '' : 'dark:text-muted-foreground'}`}
                                >
                                    USD
                                </Label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-md my-4">
                            <Input
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.0"
                                disabled={false}
                                className="py-8 px-4 text-4xl"
                            />
                            <p className="py-2 border-b">Breakdown</p>
                            <div className="flex flex-col gap-md w-full">
                                <div className="flex flex-col gap-sm w-full">
                                    {depositAll &&
                                        pool?.poolTokens?.items?.map((pt) => {
                                            return (
                                                <TokenAmountInactive
                                                    key={pt.id}
                                                    disabled
                                                    tokenAddress={
                                                        pt.token
                                                            .id as `0x${string}`
                                                    }
                                                    tokenSymbol={
                                                        pt.token.symbol
                                                    }
                                                    tokenBalance={
                                                        balanceMapping[
                                                            pt.token
                                                                .id as `0x${string}`
                                                        ]
                                                    }
                                                    tokenLogo={
                                                        tokens[chainId].find(
                                                            (tkn) =>
                                                                tkn.symbol.toLowerCase() ===
                                                                pt.token.symbol.toLowerCase()
                                                        )?.logo ||
                                                        tokens[chainId]?.filter(
                                                            (tkn) =>
                                                                tkn.address ===
                                                                selectedTokens[0]
                                                        )[0]?.logo
                                                    }
                                                    tokenPrice={3000} // no price provider
                                                    amount={
                                                        dependentAmounts?.reserveDeltas[
                                                            pool.poolTokens.items.findIndex(
                                                                (p) =>
                                                                    p.token
                                                                        .id ===
                                                                    pt.token.id
                                                            )
                                                        ].toString() ?? '0'
                                                    }
                                                    setAmount={() => {}}
                                                />
                                            )
                                        })}
                                </div>
                            </div>
                            <div className="flex flex-col gap-md w-full text-sm">
                                <div className="flex flex-row gap-sm justify-between w-full py-2 border-b">
                                    <p>Subtotal</p>
                                    <p>$100,000.00</p>
                                </div>
                                <div className="flex flex-row gap-sm justify-between w-full">
                                    <p className="text-muted dark:text-muted-foreground">
                                        Fee
                                    </p>

                                    <p className="text-muted dark:text-muted-foreground">
                                        $100.00
                                    </p>
                                </div>
                                <div className="flex flex-row gap-sm justify-between w-full py-2 border-t">
                                    <p>Total</p>
                                    <p>$100,100.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        id="deposit-review"
                        className="flex flex-col w-1/2 gap-lg"
                    >
                        <p className="pb-2 border-b">Review Details</p>
                        <div className="flex flex-col gap-sm">
                            <small>Transaction information</small>
                            <div className="flex flex-row gap-xs justify-between w-full">
                                <small className="text-muted dark:text-muted-foreground">
                                    Est. LPT received
                                </small>
                                <small>100</small>
                            </div>
                            <div className="flex flex-row gap-xs justify-between w-full">
                                <small className="text-muted dark:text-muted-foreground">
                                    Est. LPT price
                                </small>
                                <small>1.03</small>
                            </div>
                            <div className="flex flex-row gap-xs justify-between w-full">
                                <small className="text-muted dark:text-muted-foreground">
                                    Est. tx fee
                                </small>
                                <small>0.0001 ETH</small>
                            </div>
                        </div>
                        <div className="flex flex-col gap-sm">
                            <small>Payment information</small>
                            <div className="flex flex-row gap-xs justify-between w-full">
                                <small className="text-muted dark:text-muted-foreground">
                                    From
                                </small>
                                <small>
                                    <LabelWithEtherscan
                                        label={shortAddress(address!)}
                                        address={address!}
                                    />
                                </small>
                            </div>
                            <div className="flex flex-row gap-xs justify-between w-full">
                                <small className="text-muted dark:text-muted-foreground">
                                    Protocol
                                </small>
                                <small>
                                    <LabelWithEtherscan
                                        label={'DFMM v0.2.0'}
                                        address={dfmmAddress as `0x${string}`}
                                    />
                                </small>
                            </div>
                            <div className="flex flex-row gap-xs justify-between w-full">
                                <small className="text-muted dark:text-muted-foreground">
                                    LPT
                                </small>
                                <small>
                                    <LabelWithEtherscan
                                        label={pool.name}
                                        address={pool.lpToken}
                                    />
                                </small>
                            </div>
                        </div>
                        <div className="flex flex-row gap-sm w-full items-center">
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                id="depositAll"
                                name="depositAll"
                                required
                                checked={depositAll}
                                onChange={() => {
                                    // todo: keep selected.
                                }}
                                disabled={true}
                            />{' '}
                            <label
                                htmlFor="depositAll"
                                className="flex items-center"
                            >
                                <small>Deposit all tokens</small>
                            </label>
                        </div>
                        <TransactionAction
                            phase={
                                !simulatedResult
                                    ? TransactionPhase.Simulate
                                    : remainingAllowances.length > 0
                                      ? TransactionPhase.Approve
                                      : TransactionPhase.Execute
                            }
                        />
                        {successfulReceipts.length > 0 && (
                            <div className="flex flex-col gap-md">
                                <p className="pb-2 border-b">
                                    Recent Transactions
                                </p>
                                {successfulReceipts.map((receipt) => {
                                    return (
                                        <div
                                            className="flex flex-row gap-sm justify-between w-full items-center"
                                            key={receipt.transactionHash}
                                        >
                                            <small>
                                                {receipt.status ===
                                                'success' ? (
                                                    <CheckCircledIcon
                                                        color="#34d399"
                                                        fontSize={28}
                                                    />
                                                ) : (
                                                    <QuestionMarkCircledIcon />
                                                )}
                                            </small>
                                            Deposit
                                            <LabelWithEtherscan
                                                label="From"
                                                address={receipt.from}
                                            />
                                            <LabelWithEtherscan
                                                label="To"
                                                address={receipt.to}
                                            />
                                            <TxLabelEtherscan
                                                label="Tx"
                                                txHash={receipt.transactionHash}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

function AddLiquidity({
    pool,
}: {
    pool?: PoolWithTokensFragment
}): JSX.Element {
    const { id } = useParams()
    const { address } = useAccount()
    const chainId = useChainId()

    const [balances, setBalances] = useState<number[]>([])
    const [balanceMapping, setBalance] = useState<{ [key: string]: number }>({})
    const [amount, setAmount] = useState<string>('') // numeraire input amount

    useEffect(() => {
        async function fetchBalances(): Promise<void> {
            if (!pool?.poolTokens?.items) return

            const newBalances: number[] = []
            let setInitialToken = false

            for (const poolToken of pool.poolTokens.items) {
                const balance = await balanceOf(
                    poolToken.token.id as `0x${string}`,
                    address!
                )
                newBalances.push(balance)
                setBalance((prev) => ({
                    ...prev,
                    [poolToken.token.id as `0x${string}`]: balance,
                }))

                // Sets the first eligible token as the token in the amount form.
                if (balance > 0 && !setInitialToken) {
                    setSelectedTokens((prev) => [poolToken.token.id])
                    setInitialToken = true
                }
            }
            setBalances(newBalances)
        }

        if (address && pool?.poolTokens?.items) {
            fetchBalances()
        }
    }, [address, pool?.poolTokens?.items])

    const [selectedTokens, setSelectedTokens] = useState<string[]>([
        pool?.poolTokens?.items?.[0]?.token.id as `0x${string}`,
    ])

    const noEligibleTokens = !balances || balances.every((b) => b === 0)

    const [expandEligibleTokens, setExpandEligibleTokens] =
        useState<boolean>(false)

    /// todo: need single sided deposits in dfmm...
    async function prepareAllocate(): Promise<void> {
        if (!selectedTokens || selectedTokens.length === 0) {
            return
        }

        if (!address) {
            return
        }

        if (!amount || parseFloat(amount) === 0) {
            return
        }

        // Need the pool id, token index, and amount.
    }

    return (
        <section id="user-actions">
            <div className="flex flex-row w-full gap-0">
                <div className="bg-dagger1 self-start w-full">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row gap-md w-full">
                                <div className="flex flex-col gap-sm w-2/3">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>
                                                    <h5 className="text-primary">
                                                        Deposit
                                                    </h5>
                                                </TableHead>
                                            </TableRow>
                                            <TableRow>
                                                <TableHead>
                                                    Eligible Tokens
                                                </TableHead>
                                                <TableHead>
                                                    Your Balance
                                                </TableHead>
                                                <TableHead>Selection</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {pool?.poolTokens?.items
                                                ?.filter(
                                                    (_: any, index: number) =>
                                                        balances?.[index] > 0 ||
                                                        expandEligibleTokens
                                                )
                                                .map((poolToken: PoolToken) => {
                                                    const token =
                                                        poolToken.token.id
                                                    const balance =
                                                        balanceMapping[
                                                            poolToken.token
                                                                .id as `0x${string}`
                                                        ]
                                                    const isDisabled =
                                                        !token ||
                                                        !balance ||
                                                        balance === 0

                                                    return (
                                                        <TableRow
                                                            key={poolToken.id}
                                                            className={`${isDisabled ? 'hover:bg-transparent' : ''}`}
                                                        >
                                                            <TableCell
                                                                className={`${isDisabled ? 'dark:text-muted-foreground' : ''}`}
                                                            >
                                                                <div className="flex flex-row gap-sm items-center">
                                                                    <img
                                                                        src={
                                                                            tokens?.[
                                                                                chainId
                                                                            ].find(
                                                                                (
                                                                                    tkn
                                                                                ) =>
                                                                                    tkn.symbol.toLowerCase() ===
                                                                                    poolToken.token.symbol.toLowerCase()
                                                                            )
                                                                                ?.logo
                                                                        }
                                                                        alt={
                                                                            poolToken
                                                                                .token
                                                                                .symbol
                                                                        }
                                                                        className={`${isDisabled ? 'dark:opacity-70' : ''} rounded-full size-6`}
                                                                        style={{
                                                                            zIndex: 1,
                                                                        }}
                                                                    />

                                                                    {
                                                                        poolToken
                                                                            .token
                                                                            .symbol
                                                                    }
                                                                </div>
                                                            </TableCell>
                                                            <TableCell
                                                                className={`${isDisabled ? 'dark:text-muted-foreground' : ''}`}
                                                            >
                                                                {formatNumber(
                                                                    balance
                                                                )}
                                                            </TableCell>
                                                            <TableCell>
                                                                <input
                                                                    type="checkbox"
                                                                    onChange={() =>
                                                                        setSelectedTokens(
                                                                            (
                                                                                prev
                                                                            ) =>
                                                                                prev.includes(
                                                                                    token
                                                                                )
                                                                                    ? prev.filter(
                                                                                          (
                                                                                              t
                                                                                          ) =>
                                                                                              t !==
                                                                                              token
                                                                                      )
                                                                                    : [
                                                                                          ...prev,
                                                                                          token,
                                                                                      ]
                                                                        )
                                                                    }
                                                                    checked={
                                                                        selectedTokens.includes(
                                                                            token
                                                                        ) &&
                                                                        !isDisabled
                                                                    }
                                                                    disabled={
                                                                        isDisabled
                                                                    }
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                })}
                                            {noEligibleTokens && (
                                                <TableRow>
                                                    <p className="dark:text-muted-foreground m-auto p-2 text-sm">
                                                        No tokens to deposit
                                                    </p>
                                                </TableRow>
                                            )}
                                            <TableRow>
                                                <TableCell>
                                                    <button
                                                        onClick={() =>
                                                            setExpandEligibleTokens(
                                                                !expandEligibleTokens
                                                            )
                                                        }
                                                        className="p-2 flex flex-row items-center gap-xs"
                                                    >
                                                        {expandEligibleTokens
                                                            ? 'Show less'
                                                            : 'Show eligible'}{' '}
                                                        {expandEligibleTokens ? (
                                                            <CaretUpIcon />
                                                        ) : (
                                                            <CaretDownIcon />
                                                        )}
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>

                                <div className="flex flex-col w-1/3 items-start gap-md bg-gray-900 shadow-lg p-4 rounded-lg">
                                    <div className="flex flex-col gap-sm">
                                        <p>Review</p>
                                        <p className="text-muted-foreground dark:text-muted-foreground text-sm">
                                            {selectedTokens?.[0] ? (
                                                <>
                                                    Start a deposit transaction
                                                    for{' '}
                                                    <strong>
                                                        {selectedTokens.length}
                                                    </strong>{' '}
                                                    selected tokens.
                                                </>
                                            ) : (
                                                'Select tokens to deposit.'
                                            )}
                                        </p>
                                    </div>
                                    <TransactionView
                                        selectedTokens={selectedTokens}
                                        pool={pool}
                                        balanceMapping={balanceMapping}
                                    />
                                    <div className="flex flex-row gap-sm justify-between w-full border-t py-2">
                                        <small className="text-muted-foreground dark:text-muted-foreground">
                                            Estimated tx fee
                                        </small>
                                        <small>0.0001 ETH</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function UserPositions({
    pool,
}: {
    pool: PoolWithTokensFragment
}): JSX.Element {
    const [range, setRange] = useState<number>(0)

    const { address } = useAccount()
    const userPositions = pool?.positions?.items?.filter(
        (position: Position) =>
            getAddress(position.accountId) === getAddress(address as string)
    )

    const { data: positions } = useGraphQL(allPositionsQueryDocument, {
        limit: 20,
        variables: {
            poolId: pool.id,
            accountId: address,
        },
    })

    const noExistingPositions = userPositions?.length === 0

    return (
        <section id="user-positions">
            <div className="flex flex-row w-full gap-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <h5 className="text-primary">Your Position</h5>
                            </TableHead>
                        </TableRow>
                        <TableRow>
                            <TableHead>Token</TableHead>
                            <TableHead>Holdings</TableHead>
                            <TableHead>Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {noExistingPositions && (
                            <TableRow>
                                <p className="dark:text-muted-foreground m-auto p-2 text-sm">
                                    No positions
                                </p>
                            </TableRow>
                        )}
                        {positions &&
                            positions?.positions?.items
                                ?.filter(
                                    (position) =>
                                        getAddress(position?.accountId) ===
                                        getAddress(address as string)
                                )
                                ?.map((position: Position) => {
                                    return (
                                        <TableRow key={position.id}>
                                            <TableCell>{pool?.name}</TableCell>
                                            <TableCell>
                                                {formatWad(
                                                    position.liquidityWad
                                                )}
                                            </TableCell>
                                            <TableCell>todo</TableCell>
                                        </TableRow>
                                    )
                                })}
                    </TableBody>
                </Table>
                <div className="flex flex-col gap-md">
                    <h5>Withdraw</h5>
                    <form
                        className="flex flex-col gap-lg"
                        onSubmit={(e) => {
                            e.preventDefault()
                            // deallocate
                        }}
                    >
                        <div className="flex flex-row gap-md">
                            <label className="flex items-center gap-xs">
                                <input
                                    type="radio"
                                    name="withdrawRange"
                                    value="25"
                                    onChange={() => setRange(25)}
                                    checked={range === 25}
                                    className="form-radio"
                                />
                                <span className="ml-2">25%</span>
                            </label>
                            <label className="flex items-center gap-xs">
                                <input
                                    type="radio"
                                    name="withdrawRange"
                                    value="50"
                                    onChange={() => setRange(50)}
                                    checked={range === 50}
                                    className="form-radio"
                                />
                                <span className="ml-2">50%</span>
                            </label>
                            <label className="flex items-center gap-xs">
                                <input
                                    type="radio"
                                    name="withdrawRange"
                                    value="100"
                                    onChange={() => setRange(100)}
                                    checked={range === 100}
                                    className="form-radio"
                                />
                                <span className="ml-2">All</span>
                            </label>
                            <label className="flex items-center gap-xs">
                                <input
                                    type="radio"
                                    name="withdrawRange"
                                    value="custom"
                                    onChange={() => {}}
                                    checked={
                                        range !== 25 &&
                                        range !== 50 &&
                                        range !== 100
                                    }
                                    className="form-radio"
                                />

                                <Input
                                    value={range.toString()}
                                    onChange={(e) =>
                                        setRange(parseInt(e.target.value))
                                    }
                                    placeholder="0.00"
                                />
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 rounded px-4 py-2 disabled:opacity-50 hover:bg-blue-700 disabled:hover:bg-blue-600"
                            onClick={() => {
                                // deallocate
                            }}
                            disabled={noExistingPositions}
                        >
                            Withdraw
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

/**
 * @notice For an asset of a pool, computes how many tokens are in each liquidity pool token.
 * @param reserve Amount of tokens in the reserve of a pool in decimal units.
 * @param poolLiquidity Amount of total liquidity of the pool in decimal units.
 * @param liquidityTokenSupply Total supply of the liquidity pool token in decimal units.
 * @returns Proportion of a given token per pool liquidity token.
 */
function computeTokenBreakdown(
    reserve: number,
    poolLiquidity: number,
    liquidityTokenSupply: number
): number {
    return reserve / liquidityTokenSupply
}

/**
 * @notice Computes the proportion of reserves to pool liquidity to lp token for each pool asset.
 */
function TokenBreakdown({
    pool,
}: {
    pool: PoolWithTokensFragment
}): JSX.Element {
    const chainId = useChainId()
    const [totalLpt, setTotalSupply] = useState<bigint>(BigInt(0))

    // todo: make sure we are making use of query under the hood of wagmi
    useEffect(() => {
        async function fetchTotalSupply(): Promise<void> {
            const supply = await totalSupply(pool.lpToken)
            setTotalSupply(supply)
        }

        if (pool.lpToken) {
            fetchTotalSupply()
        }
    }, [])

    return (
        <section id="token-prices">
            <div className="flex flex-col gap-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <h5 className="text-primary">
                                    Token Breakdown
                                </h5>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>

                <div className="flex flex-row gap-4">
                    {pool.poolTokens.items.map((poolToken: PoolToken, i) => {
                        return (
                            <div
                                key={poolToken.token.id}
                                className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-2 flex flex-row gap-2 items-center"
                            >
                                <img
                                    src={
                                        tokens?.[chainId].find(
                                            (tkn) =>
                                                tkn.symbol.toLowerCase() ===
                                                poolToken.token.symbol.toLowerCase()
                                        )?.logo
                                    }
                                    alt={poolToken.token.symbol}
                                    className="rounded-full size-6"
                                />
                                <p>
                                    {formatNumber(
                                        computeTokenBreakdown(
                                            pool.reserves[i],
                                            pool.liquidity,
                                            parseFloat(
                                                formatUnits(totalLpt, 18)
                                            )
                                        )
                                    )}
                                    {poolToken.token.symbol} /{' '}
                                    <small className="dark:text-muted-foreground text-muted">
                                        {' '}
                                        {pool.name.slice(0, 5).toUpperCase()}
                                    </small>
                                </p>
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nulla nec dui eget urna aliquet
                                aliquam.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-8">
                <p>Recent Transactions</p>
                <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid">
                    <TransactionTable
                        poolId={poolId}
                        poolTokens={pool?.poolTokens?.items}
                    />
                </div>
            </div>
        </section>
    )
}

function Pool(): JSX.Element {
    const { id } = useParams()
    const { address } = useAccount()
    const poolId = id ? id : '0' // return to pool #0 if null

    const { data } = useGraphQL(poolInfoQueryDocument, { id: poolId })
    const pool = useFragment(PoolWithTokensFragment, data?.pool)
    const ng3mParams = useGraphQL(nGParamsQueryDocument, { id: poolId })
    const csParams = useGraphQL(csParamsQueryDocument, { id: poolId })
    const lNParams = useGraphQL(lNParamsQueryDocument, { id: poolId })

    const parameters =
        pool?.strategy?.name === 'ConstantSum'
            ? csParams.data?.constantSumParams
            : pool?.strategy?.name === 'LogNormal'
              ? lNParams?.data?.LogNormalParams
              : ng3mParams?.data?.nTokenGeometricMeanParams

    const isUserConnected = typeof address !== 'undefined'

    if (!pool?.poolTokens?.items || !parameters) return <></>
    return (
        <div className="container mx-auto max-w-4xl my-8 flex flex-col gap-2xl">
            <Overview pool={pool} />

            {isUserConnected && <AddLiquidity pool={pool} />}
            {isUserConnected && <UserPositions pool={pool} />}

            <PoolInfo pool={pool} />
            <TokenBreakdown pool={pool} />
            <PoolBreakdown pool={pool} />
            <RecentTransactions pool={pool} />
        </div>
    )
}

export default Pool
