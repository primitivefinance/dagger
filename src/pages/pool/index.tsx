import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAccount, useChainId } from 'wagmi'

import { tokens } from '../../data/tokens'
import { shortAddress } from '../../utils/address'
import { balanceOf, totalSupply } from '../../lib/erc20'
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
                                        <>
                                            <img
                                                src={
                                                    tokens[chainId].find(
                                                        (tkn) =>
                                                            tkn.symbol.toLowerCase() ===
                                                            poolToken.token.symbol.toLowerCase()
                                                    )?.logo
                                                }
                                                alt={poolToken?.token?.symbol}
                                                className="rounded-full size-12"
                                                style={{
                                                    zIndex: 1,
                                                }}
                                            />
                                            <div
                                                className="bg-gray-600 px-2 rounded-full text-xs"
                                                style={{
                                                    zIndex: 2,
                                                    marginLeft: '-1rem',
                                                    marginTop: '1rem',
                                                }}
                                            >
                                                {poolToken?.token.symbol}
                                            </div>
                                        </>
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

function LabelWithEtherscan({
    label,
    address,
}: {
    label: string
    address: `0x${string}`
}): JSX.Element {
    return (
        <div className="flex flex-row gap-1 items-center justify-between">
            <p className="text-sm">{label}</p>
            <a
                href={OP_SEPOLIA_ETHERSCAN + address}
                className="flex flex-row gap-1"
                target="_blank"
                rel="noreferrer"
            >
                <small>{shortAddress(address)}</small>
                <LinkIcon />
            </a>
        </div>
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
                            <div className="flex flex-row gap-lg w-full">
                                <div className="flex flex-col gap-sm w-full">
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
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="flex flex-col gap-md">
                                    <h5>Amount</h5>
                                    <div className="flex flex-row gap-md">
                                        <TokenAmountInput
                                            tokenAddress={
                                                selectedTokens[0] as `0x${string}`
                                            }
                                            tokenSymbol={
                                                pool.poolTokens.items.filter(
                                                    (pt) =>
                                                        pt.token.id ===
                                                        selectedTokens[0]
                                                )[0]?.token.symbol ||
                                                tokens[chainId]?.filter(
                                                    (tkn) =>
                                                        tkn.address ===
                                                        selectedTokens[0]
                                                )[0]?.symbol
                                            }
                                            tokenBalance={
                                                balanceMapping[
                                                    selectedTokens[0] as `0x${string}`
                                                ]
                                            }
                                            tokenLogo={
                                                tokens[chainId].find(
                                                    (tkn) =>
                                                        tkn?.symbol.toLowerCase() ===
                                                        pool?.poolTokens?.items
                                                            .find(
                                                                (pt) =>
                                                                    pt.token
                                                                        .id ===
                                                                    selectedTokens[0]
                                                            )
                                                            ?.token.symbol.toLowerCase()
                                                )?.logo ||
                                                tokens[chainId]?.filter(
                                                    (tkn) =>
                                                        tkn.address ===
                                                        selectedTokens[0]
                                                )[0]?.logo
                                            }
                                            tokenPrice={3000} // no price provider
                                            amount={amount}
                                            setAmount={setAmount}
                                        />
                                    </div>
                                    <button
                                        onClick={async () => {
                                            // allocate
                                        }}
                                        className="bg-blue-600 rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600"
                                        disabled
                                    >
                                        Deposit
                                    </button>
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
        (position: Position) => position?.id === address
    )

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
                        {userPositions.map((position: Position) => {
                            return (
                                <TableRow key={position.id}>
                                    <TableCell>{pool?.name}</TableCell>
                                    <TableCell>{position.liquidity}</TableCell>
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
    return reserve / poolLiquidity / liquidityTokenSupply
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
