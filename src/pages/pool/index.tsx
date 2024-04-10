import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAccount, useChainId } from 'wagmi'

import { tokens } from '../../data/tokens'
import { shortAddress } from '../../utils/address'
import { balanceOf } from '../../lib/erc20'
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

function Overview({
    title,
    src,
    alt,
    pool,
}: {
    title: string
    src: string
    alt: string
    pool?: PoolWithTokensFragment
}): JSX.Element {
    const chainId = useChainId()

    return (
        <section id="overview">
            <div className="flex flex-col gap-xl">
                <div className="rounded-full size-3xl bg-gray-900 flex">
                    <img
                        src={src}
                        alt={alt}
                        className="dark:invert items-center justify-center m-auto h-16 pl-3"
                        style={{
                            zIndex: 1,
                        }}
                    />
                </div>

                <div className="flex flex-row items-start gap-lg w-full">
                    <div className="flex flex-col gap-sm w-1/2">
                        <h2>{title}</h2>
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
    items = [
        {
            key: 'Name',
            value: pool.name,
        },
        {
            key: 'ID',
            value: pool.id,
        },
        {
            key: 'Type',
            value: pool.strategy.name,
        },
        {
            key: 'Curator',
            value: pool.strategy.controller,
        },
        {
            key: 'Tokens',
            value: pool.poolTokens.items.map((poolToken: PoolToken) => {
                return (
                    <div
                        key={poolToken.token.id}
                        className="flex flex-row text-center w-full gap-xs items-center"
                    >
                        {poolToken.token.symbol}{' '}
                        <a
                            href={`https://sepolia-optimistic.etherscan.io/address/${poolToken.token.id}`}
                            className="flex flex-row gap-1"
                        >
                            <small>
                                {shortAddress(
                                    poolToken.token.id as `0x${string}`
                                )}
                            </small>
                            <LinkIcon />
                        </a>
                    </div>
                )
            }),
        },
        {
            key: 'Swap Fee',
            value: pool.strategy.swapFee,
        },
        {
            key: 'Liquidity',
            value: pool.liquidity,
        },
        {
            key: 'Reserves',
            value: pool.reserves,
        },
        {
            key: 'Weights',
            value: (
                <div>
                    {pool?.parameters?.lastComputedWeights.map(
                        (weight: number, i: number) => {
                            return (
                                <div key={i} className="flex flex-col">
                                    <p>Weight #{i}</p>
                                    <p>{(weight / 1e18) * 100}%</p>
                                </div>
                            )
                        }
                    )}
                </div>
            ),
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

function PoolBreakdown({
    pool,
}: {
    pool?: PoolWithTokensFragment
}): JSX.Element {
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
                    <TableBody>
                        {pool?.poolTokens?.items?.map(
                            (poolToken: PoolToken) => {
                                return (
                                    <TableRow key={poolToken.id}>
                                        <TableCell>100%</TableCell>
                                        <TableCell>Token</TableCell>
                                        <TableCell>100</TableCell>
                                        <TableCell>100000</TableCell>
                                    </TableRow>
                                )
                            }
                        )}
                    </TableBody>
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
    const [amount, setAmount] = useState<string>('') // numeraire input amount

    useEffect(() => {
        async function fetchBalances(): Promise<void> {
            if (!pool?.poolTokens?.items) return

            const newBalances: number[] = []

            for (const poolToken of pool.poolTokens.items) {
                const balance = await balanceOf(
                    poolToken.token.id as `0x${string}`,
                    address!
                )
                newBalances.push(balance)
            }
            setBalances(newBalances)
            console.log('balances', newBalances)
        }

        if (address && pool?.poolTokens?.items) {
            console.log('fetching balances')
            fetchBalances()
        }
    }, [address, pool?.poolTokens?.items])

    const [isAddLiquidity, setIsAddLiquidity] = useState<boolean>(true)

    return (
        <section id="user-actions">
            <div className="flex flex-row w-full gap-0">
                <div className="bg-dagger1 self-start w-full">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row gap-lg w-full">
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
                                                Eligible Token
                                            </TableHead>
                                            <TableHead>Your Balance</TableHead>
                                            <TableHead>Selection</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>ETH</TableCell>
                                            <TableCell>$100,000.00</TableCell>
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    checked={isAddLiquidity}
                                                    onChange={() =>
                                                        setIsAddLiquidity(
                                                            !isAddLiquidity
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>ETH</TableCell>
                                            <TableCell>$100,000.00</TableCell>
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    checked={isAddLiquidity}
                                                    onChange={() =>
                                                        setIsAddLiquidity(
                                                            !isAddLiquidity
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>ETH</TableCell>
                                            <TableCell>$100,000.00</TableCell>
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    checked={isAddLiquidity}
                                                    onChange={() =>
                                                        setIsAddLiquidity(
                                                            !isAddLiquidity
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow></TableRow>
                                    </TableBody>
                                </Table>
                                <div className="flex flex-col gap-md">
                                    <h5>Amount</h5>
                                    <div className="flex flex-row gap-md">
                                        <TokenAmountInput
                                            tokenAddress={
                                                pool?.poolTokens?.items[0]
                                                    ?.token?.id as `0x${string}`
                                            }
                                            tokenSymbol={
                                                pool.poolTokens.items[0].token
                                                    .symbol
                                            }
                                            tokenBalance={balances[0]}
                                            tokenLogo={
                                                tokens[chainId].find(
                                                    (tkn) =>
                                                        tkn?.symbol.toLowerCase() ===
                                                        pool?.poolTokens?.items[0].token.symbol.toLowerCase()
                                                )?.logo || ''
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
                            <TableHead>Balance</TableHead>
                            <TableHead>Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pool?.positions?.items?.map((position: Position) => {
                            return (
                                <TableRow key={position.id}>
                                    <TableCell>ETH</TableCell>
                                    <TableCell>1.432</TableCell>
                                    <TableCell>2,414.42</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <div className="flex flex-col gap-md">
                    <h5>Amount</h5>
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
                            className="bg-blue-600 rounded px-4 py-2"
                            onClick={() => {
                                // deallocate
                            }}
                        >
                            Withdraw
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

function TokenPrices({ pool }: { pool: PoolWithTokensFragment }): JSX.Element {
    const chainId = useChainId()
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
                    {pool.poolTokens.items.map((poolToken: PoolToken) => {
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
                                    {/**
                                 * {computePrice(
                                    pool.reserveX,
                                    pool.reserveY,
                                    pool.parameters.weightX,
                                    pool.parameters.weightY
                                ).toLocaleString(undefined)}
                                 */}{' '}
                                    {poolToken.token.symbol}{' '}
                                    <small>
                                        per{' '}
                                        {
                                            pool?.poolTokens?.items[0].token
                                                .symbol
                                        }
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

    const isUserConnected = true // todo: fix

    if (!pool?.poolTokens?.items || !parameters) return <></>
    return (
        <div className="container mx-auto max-w-4xl my-8 flex flex-col gap-2xl">
            <Overview
                title="Superliquid ETH"
                src={'/plogodarksvg.svg'}
                alt="pool"
                pool={pool}
            />

            {isUserConnected && <AddLiquidity pool={pool} />}
            {isUserConnected && <UserPositions pool={pool} />}

            <PoolInfo pool={pool} />
            <TokenPrices pool={pool} />
            <PoolBreakdown pool={pool} />
            <RecentTransactions pool={pool} />
        </div>
    )
}

export default Pool
