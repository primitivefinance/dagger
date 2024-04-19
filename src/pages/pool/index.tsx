import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import {
    useAccount,
    useChainId,
    useReadContract,
    useReadContracts,
} from 'wagmi'

import { tokens } from '../../data/tokens'
import { totalSupply } from '../../lib/erc20'
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

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { PoolToken, PoolTokenItemFragment, Position } from 'gql/graphql'
import {
    CaretDownIcon,
    CaretUpIcon,
    CheckCircledIcon,
    QuestionMarkCircledIcon,
    QuestionMarkIcon,
} from '@radix-ui/react-icons'
import {
    TransactionReceipt,
    encodeAbiParameters,
    erc20Abi,
    formatEther,
    formatUnits,
    getAddress,
    parseAbiParameters,
    zeroAddress,
} from 'viem'
import { dfmmAddress, nG3mStrategy } from '@/data/contracts'

import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

import { dfmmABI } from '@/lib/abis/dfmm'

import { allPositionsQueryDocument } from '../../queries/positions'

import { useTransactionStatus } from '@/components/TransactionButton/useTransactionStatus'

import {
    LabelWithEtherscan,
    TxLabelEtherscan,
} from '@/components/EtherscanLinkLabels'
import {
    formatNumber,
    formatWad,
    formatWadPercentage,
    toWad,
} from '@/utils/numbers'
import TokenLogo from '@/components/TokenLogo'
import TransactionButton from '@/components/TransactionButton'
import { overrideAllowanceDFMM } from '@/utils/simulate'
import TransactionDrawer from '@/components/TransactionDrawer'
import PoolInfo from '@/components/PoolInfo'
import { PoolTypes, getPoolType } from '@/utils/pools'
import { DEFAULT_TOKEN_LOGO_SRC } from '@/utils/tokens'
import { prepareAllocate } from '@/utils/allocate'
import TransactionTable from '@/components/TransactionTable'
import { prepareDeallocate } from '@/utils/deallocate'

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
                <TokenLogo
                    key={pool?.symbol}
                    chainId={chainId}
                    custom={
                        pool
                            ? {
                                  logo: pool?.logo,
                                  symbol: pool?.name,
                              }
                            : undefined
                    }
                    size="xl"
                />

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
                        <div className="flex flex-wrap items-center">
                            {pool?.poolTokens?.items?.map(
                                (poolToken: PoolToken) => {
                                    return (
                                        <TokenLogo
                                            key={poolToken?.token?.id}
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
                params?.lastComputedWeights.map((weight: bigint, i: number) => {
                    const poolToken: PoolTokenItemFragment =
                        pool.poolTokens.items[i]
                    const reserve = pool.reserves[i]

                    return (
                        <TableRow key={poolToken?.token?.id}>
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
    if (isNaN(deltaT)) {
        throw new Error('computeAllocationDeltasGivenDeltaT: Invalid `deltaT`')
    }

    if (isNaN(indexT)) {
        throw new Error('computeAllocationDeltasGivenDeltaT: Invalid `indexT`')
    }

    if (isNaN(liquidity) || typeof liquidity !== 'number') {
        throw new Error(
            'computeAllocationDeltasGivenDeltaT: Invalid `liquidity`'
        )
    }

    if (reserves.length === 0) {
        throw new Error(
            'computeAllocationDeltasGivenDeltaT: Invalid `reserves`'
        )
    }

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

function SuccessfulTransactions({
    receipts,
}: {
    receipts: TransactionReceipt[]
}): JSX.Element {
    return (
        <div className="flex flex-col gap-md">
            <p className="pb-2 border-b">Recent Transactions</p>
            {receipts.map((receipt: TransactionReceipt) => {
                return (
                    <div
                        className="flex flex-row gap-sm justify-between w-full items-center"
                        key={receipt.transactionHash}
                    >
                        <small>
                            {receipt.status === 'success' ? (
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
                            label={<small>From</small>}
                            address={receipt.from}
                        />
                        <LabelWithEtherscan
                            label={<small>To</small>}
                            address={
                                typeof receipt.to === 'string'
                                    ? receipt.to
                                    : zeroAddress
                            }
                        />
                        <TxLabelEtherscan
                            label={<small>Tx</small>}
                            txHash={receipt.transactionHash}
                        />
                    </div>
                )
            })}
        </div>
    )
}

function TransactionView({
    selectedTokens,
    pool,
}: {
    selectedTokens: `0x${string}`[]
    pool: PoolWithTokensFragment
}): JSX.Element {
    // Transaction sender and context
    const { address } = useAccount()
    const { setTxHash: setTx, txReceipt, txHash } = useTransactionStatus({})

    // Form settings
    const [isUSD, setIsUSD] = useState<boolean>(false)
    const [depositAll, setDepositAll] = useState<boolean>(false) // todo: make conditional once single sided deposits are available

    // Form inputs
    const [amount, setAmount] = useState<string>('')

    // Form results
    const [successfulReceipts, setSuccessfulReceipts] = useState<
        TransactionReceipt[]
    >([])

    // Token balances
    const balanceCall = {
        abi: erc20Abi,
        functionName: 'balanceOf',
    }

    // todo: use for delta check in future?
    const { data: balances } = useReadContracts({
        contracts: pool?.poolTokens?.items?.map(
            (pt: PoolTokenItemFragment) => ({
                address: pt.token.id as `0x${string}`,
                args: [address],
                ...balanceCall,
            })
        ),
    })

    // Token allowances
    const allowanceCall = {
        abi: erc20Abi,
        functionName: 'allowance',
    }

    const { data: allowances, refetch: refetchAllowances } = useReadContracts({
        contracts: pool?.poolTokens?.items?.map(
            (pt: PoolTokenItemFragment) => ({
                address: pt.token.id as `0x${string}`,
                args: [address, dfmmAddress],
                ...allowanceCall,
            })
        ),
    })

    // todo: update with the deposit single allocate logic
    // Compute the transaction payload amounts.
    const independentToken = selectedTokens?.[0]

    const { data: poolsSnapshot } = useReadContract({
        address: dfmmAddress,
        abi: dfmmABI,
        functionName: 'pools',
        args: [pool.id],
    })

    const {
        deltas: dependentAmounts,
        liquidity: deltaLiquidity,
        payload: allocatePayload,
    }: {
        deltas: number[]
        liquidity: number
        payload: string
    } = +amount > 0 && independentToken
        ? prepareAllocate(
              amount,
              pool.poolTokens.items.findIndex(
                  (pt: PoolTokenItemFragment) =>
                      getAddress(pt.token.id) === getAddress(independentToken)
              ),
              (poolsSnapshot as any)?.reserves ?? pool.reserves.map(toWad),
              (poolsSnapshot as any)?.totalLiquidity ?? toWad(pool.liquidity)
          )
        : {
              deltas: [],
              liquidity: 0,
              payload: '',
          }

    // todo: assumes the same dependent amounts...
    const tokensToApprove = pool?.poolTokens?.items
        ?.filter((pt: PoolTokenItemFragment, index: number) => {
            const dependentAmount = dependentAmounts?.[index]
            if (isNaN(dependentAmount)) return false

            const requiredAmount = toWad(dependentAmount)
            const allowance = allowances?.[index]?.result as bigint
            return allowance < requiredAmount
        })
        .map((pt: PoolTokenItemFragment) => ({
            to: pt.token.id as `0x${string}`,
            spender: dfmmAddress,
            amount: toWad(dependentAmounts[0]),
        }))

    const selectedTokenSymbols = selectedTokens
        ?.map(
            (t) =>
                pool.poolTokens.items.filter(
                    (pt: PoolTokenItemFragment) =>
                        getAddress(pt.token.id) === getAddress(t)
                )[0]?.token.symbol
        )
        .join(', ')

    useEffect(() => {
        refetchAllowances()
    }, [txReceipt, refetchAllowances])

    // Reset the form after a successful transaction.
    useEffect(() => {
        if (txReceipt?.status === 'success' && tokensToApprove.length === 0) {
            const isReceiptAlreadyAdded = successfulReceipts.some(
                (receipt) =>
                    receipt.transactionHash === txReceipt.transactionHash
            )

            if (!isReceiptAlreadyAdded) {
                setAmount('')
                setSuccessfulReceipts((prev) => [...prev, txReceipt])
            }
        }
    }, [txReceipt, tokensToApprove, successfulReceipts])

    return (
        <TransactionDrawer
            transactionTokens={pool.poolTokens.items}
            deltas={dependentAmounts}
            openButton={<>Deposit {selectedTokenSymbols}</>}
            txTitle={
                <>
                    Deposit {selectedTokenSymbols} to {pool.name}
                </>
            }
            txDescription={
                <>Deposit tokens into a pool to mint liquidity tokens.</>
            }
            txForm={
                <>
                    <p>Amount</p>
                    <div className="flex flex-row gap-sm items-center">
                        <Label
                            htmlFor="currency-mode"
                            className={`${!isUSD ? '' : 'dark:text-muted-foreground'}`}
                        >
                            {pool?.poolTokens?.items?.find(
                                (pt: PoolTokenItemFragment) =>
                                    getAddress(pt.token.id) ===
                                    getAddress(selectedTokens[0])
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

                    <Input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.0"
                        disabled={false} // todo
                        className="py-8 px-4 text-4xl"
                    />
                </>
            }
            txSubmit={
                <>
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

                    {tokensToApprove.length > 0 ? (
                        <TransactionButton
                            key={tokensToApprove?.[0].to} // important! resets component when changed
                            contractName="erc20"
                            from={address}
                            to={tokensToApprove?.[0].to}
                            args={[
                                tokensToApprove?.[0].spender,
                                tokensToApprove?.[0].amount,
                            ]}
                            setTxHash={setTx}
                            txHash={txHash as `0x${string}`}
                            txReceipt={txReceipt}
                            functionName="approve"
                        />
                    ) : (
                        <TransactionButton
                            key={dfmmAddress}
                            contractName="dfmm"
                            from={address}
                            to={dfmmAddress}
                            args={[pool.id, allocatePayload]}
                            setTxHash={setTx}
                            txHash={txHash as `0x${string}`}
                            txReceipt={txReceipt}
                            functionName="allocate"
                            stateOverride={pool?.poolTokens?.items
                                ?.map(
                                    (pt: PoolTokenItemFragment) => pt.token.id
                                )
                                ?.map((token: `0x${string}`) => {
                                    return {
                                        address: token,
                                        stateDiff: [
                                            overrideAllowanceDFMM(
                                                address as `0x${string}`
                                            ),
                                        ],
                                    }
                                })}
                        />
                    )}

                    {successfulReceipts.length > 0 && (
                        <SuccessfulTransactions receipts={successfulReceipts} />
                    )}
                </>
            }
            externalEtherscanLinks={[
                {
                    name: 'LPT',
                    label: pool.name,
                    address: pool.lpToken,
                },
                {
                    name: 'Protocol',
                    label: 'DFMM v0.2.0',
                    address: dfmmAddress as `0x${string}`,
                },
            ]}
        />
    )
}

function EligibleTokensTable({
    selectedTokens,
    selectToken,
    pool,
}: {
    selectedTokens: `0x${string}`[]
    selectToken: React.Dispatch<React.SetStateAction<`0x${string}`[]>>
    pool?: PoolWithTokensFragment
}): JSX.Element {
    const chainId = useChainId()
    const { address } = useAccount()

    const balanceCall = {
        abi: erc20Abi,
        functionName: 'balanceOf',
    }

    const { data: balances } = useReadContracts({
        contracts: pool?.poolTokens?.items?.map(
            (pt: PoolTokenItemFragment) => ({
                address: pt.token.id as `0x${string}`,
                args: [address],
                ...balanceCall,
            })
        ),
    })

    // Expands to show all eligible tokens, even if the user has no balance.
    const [expand, setExpand] = useState<boolean>(false)

    // Don't show the tokens with 0 balances.
    const noEligible =
        !balances || balances.every((b) => (b?.result as bigint) <= 0n)

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        <h5 className="text-primary">Deposit</h5>
                    </TableHead>
                </TableRow>
                <TableRow>
                    <TableHead>Eligible Tokens</TableHead>
                    <TableHead>Your Balance</TableHead>
                    <TableHead>Selection</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {pool?.poolTokens?.items?.map(
                    (poolToken: PoolToken, index: number) => {
                        const token = poolToken.token.id as `0x${string}`
                        const balance = balances?.[index]?.result as bigint
                        const balanceFormatted = balance
                            ? formatNumber(
                                  parseFloat(
                                      formatUnits(
                                          balance,
                                          poolToken.token.decimals
                                      )
                                  )
                              )
                            : formatNumber(0)

                        // If the user has no balance and the table is not expanded, don't show the token.
                        if (!expand && balance <= 0n) {
                            return null
                        }

                        const isDisabled = !token || !balance || balance <= 0n
                        const tokenLogo =
                            tokens?.[chainId].find(
                                (t) =>
                                    getAddress(t.address) === getAddress(token)
                            )?.logo ?? DEFAULT_TOKEN_LOGO_SRC

                        return (
                            <TableRow
                                key={poolToken?.token?.id}
                                className={`${isDisabled ? 'hover:bg-transparent' : ''}`}
                            >
                                <TableCell
                                    className={`${isDisabled ? 'dark:text-muted-foreground' : ''}`}
                                >
                                    <div className="flex flex-row gap-sm items-center">
                                        <img
                                            src={tokenLogo}
                                            alt={poolToken.token.symbol}
                                            className={`${isDisabled ? 'dark:opacity-70' : ''} rounded-full size-6`}
                                            style={{
                                                zIndex: 1,
                                            }}
                                        />

                                        {poolToken.token.symbol}
                                    </div>
                                </TableCell>
                                <TableCell
                                    className={`${isDisabled ? 'dark:text-muted-foreground' : ''}`}
                                >
                                    {balanceFormatted}
                                </TableCell>
                                <TableCell>
                                    <input
                                        type="checkbox"
                                        onChange={() =>
                                            selectToken((prev) =>
                                                prev.includes(token)
                                                    ? prev.filter(
                                                          (t) => t !== token
                                                      )
                                                    : [...prev, token]
                                            )
                                        }
                                        checked={
                                            selectedTokens.includes(token) &&
                                            !isDisabled
                                        }
                                        disabled={isDisabled}
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    }
                )}
                {noEligible && (
                    <TableRow>
                        <TableCell>No tokens to deposit</TableCell>
                    </TableRow>
                )}
                <TableRow>
                    <TableCell>
                        <button
                            onClick={() => setExpand(!expand)}
                            className="p-2 flex flex-row items-center gap-xs"
                        >
                            {expand ? 'Show less' : 'Show more'}{' '}
                            {expand ? <CaretUpIcon /> : <CaretDownIcon />}
                        </button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

function AddLiquidity({
    pool,
}: {
    pool?: PoolWithTokensFragment
}): JSX.Element {
    const [selectedTokens, setSelectedTokens] = useState<`0x${string}`[]>([
        pool?.poolTokens?.items?.[0]?.token.id as `0x${string}`,
    ])

    return (
        <section id="user-actions">
            <div className="flex flex-row w-full gap-md">
                <div className="w-2/3">
                    <EligibleTokensTable
                        pool={pool}
                        selectToken={setSelectedTokens}
                        selectedTokens={selectedTokens}
                    />
                </div>

                <div className="flex flex-col w-1/3 gap-md items-start bg-gray-900 shadow-lg p-4 rounded-lg mb-auto">
                    <div className="flex flex-col gap-sm">
                        <p>Review</p>
                        <p className="text-muted-foreground dark:text-muted-foreground text-sm">
                            {selectedTokens?.[0] ? (
                                <>
                                    Start a deposit transaction for{' '}
                                    <strong>{selectedTokens.length}</strong>{' '}
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
                    />
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

    const { data: totalSupply } = useReadContract({
        address: pool.lpToken,
        abi: erc20Abi,
        functionName: 'totalSupply',
    })

    const noExistingPositions = userPositions?.length === 0

    const dependentAmounts = pool.poolTokens.items.map(
        (_: PoolTokenItemFragment) => {
            return 0
        }
    )
    const { txReceipt, txHash, setTxHash: setTx } = useTransactionStatus({})
    const [amount, setAmount] = useState<string>('')

    const [successfulReceipts, setSuccessfulReceipts] = useState<
        TransactionReceipt[]
    >([])
    const [isUSD, setIsUSD] = useState<boolean>(false)
    const [selectedTokens, setSelectedTokens] = useState<`0x${string}`[]>(
        pool?.poolTokens?.items?.map(
            (pt: PoolTokenItemFragment) => pt.token.id as `0x${string}`
        ) ?? []
    )
    const selectedTokenSymbols = selectedTokens
        ?.map(
            (t) =>
                pool.poolTokens.items.filter(
                    (pt: PoolTokenItemFragment) =>
                        getAddress(pt.token.id) === getAddress(t)
                )[0]?.token.symbol
        )
        .join(', ')

    const {
        deltas: dependentAmountsWithdraw,
        liquidity: deltaLiquidityWithdraw,
        payload: deallocatePayload,
    } = +amount > 0
        ? prepareDeallocate(amount, pool.reserves.map(toWad), totalSupply ?? 0n)
        : {
              deltas: [],
              liquidity: 0,
              payload: '',
          }

    return (
        <section id="user-positions">
            <div className="flex flex-row w-full gap-lg">
                <div className="w-2/3">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <h5 className="text-primary">
                                        Your Position
                                    </h5>
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
                                        (position: Position) =>
                                            getAddress(position?.accountId) ===
                                            getAddress(address as string)
                                    )
                                    ?.map((position: Position) => {
                                        return (
                                            <TableRow key={position.id}>
                                                <TableCell>
                                                    {pool?.name}
                                                </TableCell>
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
                </div>

                <div className="flex flex-col w-1/3 gap-md items-start bg-gray-900 shadow-lg p-4 rounded-lg mb-auto">
                    <div className="flex flex-col gap-sm">
                        <p>Review</p>
                        <p className="text-muted-foreground dark:text-muted-foreground text-sm">
                            {selectedTokens?.[0] ? (
                                <>
                                    Start a withdraw transaction for a position.
                                </>
                            ) : (
                                'Select positions to close.'
                            )}
                        </p>
                    </div>
                    <TransactionDrawer
                        transactionTokens={pool.poolTokens.items}
                        deltas={dependentAmountsWithdraw}
                        openButton={<>Withdraw {selectedTokenSymbols}</>}
                        txTitle={
                            <>
                                Withdraw {selectedTokenSymbols} from {pool.name}
                            </>
                        }
                        txDescription={
                            <>
                                Withdraw tokens from a pool by redeeming
                                liquidity tokens.
                            </>
                        }
                        txForm={
                            <>
                                <p>Amount LPT to Redeem</p>
                                <div className="flex flex-row gap-sm items-center">
                                    <Label
                                        htmlFor="currency-mode"
                                        className={`${!isUSD ? '' : 'dark:text-muted-foreground'}`}
                                    >
                                        {pool?.name || 'Asset'}
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

                                <Input
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.0"
                                    disabled={false} // todo
                                    className="py-8 px-4 text-4xl"
                                />

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
                                                disabled
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
                                                disabled
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
                                                disabled
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
                                                disabled
                                            />

                                            <Input
                                                value={range.toString()}
                                                onChange={(e) =>
                                                    setRange(
                                                        parseInt(e.target.value)
                                                    )
                                                }
                                                placeholder="0.00"
                                                disabled
                                            />
                                        </label>
                                    </div>
                                </form>
                            </>
                        }
                        txSubmit={
                            <>
                                <TransactionButton
                                    key={dfmmAddress}
                                    contractName="dfmm"
                                    from={address}
                                    to={dfmmAddress}
                                    args={[pool.id, deallocatePayload]}
                                    setTxHash={setTx}
                                    txHash={txHash as `0x${string}`}
                                    txReceipt={txReceipt}
                                    functionName="deallocate"
                                    stateOverride={pool?.poolTokens?.items
                                        ?.map(
                                            (pt: PoolTokenItemFragment) =>
                                                pt.token.id
                                        )
                                        ?.map((token: `0x${string}`) => {
                                            return {
                                                address: token,
                                                stateDiff: [
                                                    overrideAllowanceDFMM(
                                                        address as `0x${string}`
                                                    ),
                                                ],
                                            }
                                        })}
                                />

                                {successfulReceipts.length > 0 && (
                                    <SuccessfulTransactions
                                        receipts={successfulReceipts}
                                    />
                                )}
                            </>
                        }
                        externalEtherscanLinks={[
                            {
                                name: 'LPT',
                                label: pool.name,
                                address: pool.lpToken,
                            },
                            {
                                name: 'Protocol',
                                label: 'DFMM v0.2.0',
                                address: dfmmAddress as `0x${string}`,
                            },
                        ]}
                    />
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
                        )
                    })}
                </div>
            </div>
            <div className="my-8">
                <p>Recent Transactions</p>
                <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid">
                    <TransactionTable
                        poolId={pool?.id}
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
