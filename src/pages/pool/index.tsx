import { useState, useEffect, useRef } from 'react'
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
}) {
    const chainId = useChainId()

    return (
        <section id="overview">
            <div className="flex flex-col gap-lg">
                <img
                    src={src}
                    alt={alt}
                    className="rounded-full size-3xl"
                    style={{
                        zIndex: 1,
                    }}
                />

                <div className="flex flex-row items-center gap-2">
                    <div className="flex flex-row items-center">
                        {pool?.poolTokens?.items?.map((poolToken) => {
                            return (
                                <>
                                    <img
                                        src={
                                            tokens?.[chainId].find(
                                                (tkn: any) =>
                                                    tkn.symbol.toLowerCase() ===
                                                    poolToken.token.symbol.toLowerCase()
                                            )?.logo
                                        }
                                        alt={poolToken?.token?.symbol}
                                        className="rounded-full size-8"
                                        style={{
                                            zIndex: 1,
                                            opacity: '70%',
                                        }}
                                    />
                                    <div
                                        className="bg-gray-600 px-2 rounded-full"
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
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-sm">
                    <h3>{title}</h3>
                    <p>
                        The overview page provides a high-level summary of the
                        pool&#39;s details and statistics. It also provides a
                        list of recent transactions and actions taken by users.
                    </p>
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
}) {
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
            value: pool.poolTokens.items.map((poolToken) => {
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
                            <TableHead>{title}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items?.map((item, i) => {
                            if (i < firstColumnLength) {
                                return (
                                    <TableRow key={i}>
                                        <TableCell>{item.key}</TableCell>
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
                                        <TableCell>{item.key}</TableCell>
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

function PoolBreakdown({ pool }: { pool?: PoolWithTokensFragment }) {
    return (
        <section id="pool-breakdown">
            <div className="flex flex-row w-full gap-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pool Breakdown</TableHead>
                        </TableRow>
                        <TableRow>
                            <TableHead>Weight %</TableHead>
                            <TableHead>Token</TableHead>
                            <TableHead>Balance</TableHead>
                            <TableHead>Value</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pool?.poolTokens?.items?.map((poolToken, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>100%</TableCell>
                                    <TableCell>Token</TableCell>
                                    <TableCell>100</TableCell>
                                    <TableCell>100000</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}

function RecentTransactions({ pool }: { pool?: PoolWithTokensFragment }) {
    return (
        <section id="recent-transactions">
            <div className="flex flex-row w-full gap-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Recent Transactions</TableHead>
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

function UserActions({ pool }: { pool?: PoolWithTokensFragment }) {
    const { id } = useParams()
    const { address } = useAccount()
    const chainId = useChainId()
    // const { connectors, connect } = useConnect()
    // const { state } = usePrices();
    // const { prices } = state;
    const poolId = id ? id : '0' // return to pool #0 if null

    const [balances, setBalances] = useState<number[]>([])
    const [amount, setAmount] = useState<string>('') // numeraire input amount
    const [allocAmounts, setAllocAmounts] = useState<number[]>([]) // set by the return of allocateGivenNumeraire()

    const { data } = useGraphQL(poolInfoQueryDocument, { id: poolId })
    const ng3mParams = useGraphQL(nGParamsQueryDocument, { id: poolId })
    const csParams = useGraphQL(csParamsQueryDocument, { id: poolId })
    const lNParams = useGraphQL(lNParamsQueryDocument, { id: poolId })

    const parameters =
        pool?.strategy?.name === 'ConstantSum'
            ? csParams.data?.constantSumParams
            : pool?.strategy?.name === 'LogNormal'
              ? lNParams?.data?.LogNormalParams
              : ng3mParams?.data?.nTokenGeometricMeanParams

    useEffect(() => {
        setAllocAmounts([0, 0, 0, 0])
        async function fetchBalances() {
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
    console.log(balances)

    let userPosition: Position

    if (pool?.positions?.items && address) {
        userPosition = pool?.positions?.items?.find(
            (position) =>
                position.accountId.toLowerCase() ===
                address?.toLocaleLowerCase()
        )!
    }

    const [isAddLiquidity, setIsAddLiquidity] = useState<boolean>(true)
    const ref = useRef(null)
    const [range, setRange] = useState<number>(0)

    return (
        <section id="user-actions">
            <div className="flex flex-row w-full gap-0">
                <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-4 self-start w-full">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row w-full gap-xl">
                            <button
                                onClick={() => setIsAddLiquidity(true)}
                                className={`${isAddLiquidity ? 'bg-gray-900' : 'bg-transparent'}  shadow-lg px-6 py-2 rounded-lg hover:bg-gray-700`}
                            >
                                <div className="flex flex-row items-center gap-1 justify-center">
                                    <svg
                                        className="w-4 h-4"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M12 7.8v8.4M7.8 12h8.4m4.8 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                    </svg>
                                    Add liquidity
                                </div>
                            </button>
                            <button
                                onClick={() => setIsAddLiquidity(false)}
                                className={`${!isAddLiquidity ? 'bg-gray-700' : 'bg-transparent'}  shadow-lg px-6 py-2 rounded-lg hover:bg-gray-600`}
                            >
                                <div className="flex flex-row items-center gap-1 justify-center">
                                    <svg
                                        className="w-4 h-4"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.5"
                                            d="M5 12h14"
                                        />
                                    </svg>
                                    Remove liquidity
                                </div>
                            </button>
                        </div>
                        {isAddLiquidity ? (
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col">
                                    <h4>Add Liquidity</h4>
                                    <p>
                                        Increase your position by adding
                                        liquidity into the pool.
                                    </p>
                                </div>
                                <TokenAmountInput
                                    tokenAddress={
                                        pool?.poolTokens?.items[0]?.token
                                            ?.id as `0x${string}`
                                    }
                                    tokenSymbol={
                                        pool.poolTokens.items[0].token.symbol
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
                                <div className="flex flex-row gap-1 items-center justify-end">
                                    {pool.poolTokens.items.map(
                                        (poolToken, i) => {
                                            return (
                                                <>
                                                    <p>
                                                        {userPosition!
                                                            ? (
                                                                  ((userPosition.liquidity /
                                                                      pool.liquidity) *
                                                                      pool
                                                                          .reserves[
                                                                          i
                                                                      ] *
                                                                      range) /
                                                                  100
                                                              ).toLocaleString(
                                                                  undefined
                                                              )
                                                            : '0.0'}
                                                    </p>
                                                    <img
                                                        src={
                                                            tokens[
                                                                chainId
                                                            ].find(
                                                                (tkn) =>
                                                                    tkn.symbol.toLowerCase() ===
                                                                    poolToken.token.symbol.toLowerCase()
                                                            )?.logo
                                                        }
                                                        alt={
                                                            poolToken.token
                                                                .symbol
                                                        }
                                                        className="rounded-full size-3"
                                                    />
                                                    <p>
                                                        {poolToken.token.symbol}
                                                    </p>
                                                    {i + 1 ===
                                                    pool?.poolTokens?.items
                                                        ?.length ? (
                                                        <></>
                                                    ) : (
                                                        <p>+</p>
                                                    )}
                                                </>
                                            )
                                        }
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col">
                                    <h4>Remove Liquidity</h4>
                                    <p>
                                        Decrease your position by removing
                                        liquidity from the pool.
                                    </p>
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <p>{range}%</p>
                                    <div className="flex flex-row gap-2">
                                        <button onClick={() => setRange(25)}>
                                            25%
                                        </button>
                                        <button onClick={() => setRange(50)}>
                                            50%
                                        </button>
                                        <button onClick={() => setRange(75)}>
                                            75%
                                        </button>
                                        <button onClick={() => setRange(100)}>
                                            MAX
                                        </button>
                                    </div>
                                </div>
                                <input
                                    ref={ref}
                                    type="range"
                                    className="col-span-2 appearance-none bg-dagger2 rounded-full cursor-pointer h-1 w-full"
                                    step={1}
                                    min={0}
                                    max={100}
                                    onChange={(e) =>
                                        setRange(parseInt(e.target.value, 10))
                                    }
                                    value={range}
                                />
                                <div className="flex flex-row gap-1 items-center justify-end">
                                    {pool.poolTokens.items.map(
                                        (poolToken, i) => {
                                            return (
                                                <>
                                                    <p>
                                                        {allocAmounts[
                                                            i
                                                        ].toLocaleString(
                                                            undefined
                                                        )}
                                                    </p>
                                                    <img
                                                        src={
                                                            tokens[
                                                                chainId
                                                            ].find(
                                                                (tkn) =>
                                                                    tkn.symbol.toLowerCase() ===
                                                                    poolToken.token.symbol.toLowerCase()
                                                            )?.logo
                                                        }
                                                        alt={
                                                            poolToken.token
                                                                .symbol
                                                        }
                                                        className="rounded-full size-3"
                                                    />
                                                    <p>
                                                        {poolToken.token.symbol}
                                                    </p>
                                                    {i + 1 ===
                                                    pool?.poolTokens?.items
                                                        ?.length ? (
                                                        <></>
                                                    ) : (
                                                        <p>+</p>
                                                    )}
                                                </>
                                            )
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                        {/**
                             * <button
                                onClick={async () => {
                                    if (address === undefined) {
                                        connect({ connector: connectors[0] })
                                    } else {
                                        if (isAddLiquidity) {
                                            const dt = await allocateGivenX(
                                                pool.id,
                                                parseEther(amounts[0]) // amounts[0] is numeraire 
                                            ) 
                                            // approval flow starts here
                                            // before allocate, must show user required balances using dt array
                                            setAllocAmounts(dt) // not implemented until we have lib logic
                                            await allocate(
                                                pool.id,
                                                dt[0],
                                                dt[1],
                                                dt[2]
                                            )
                                        } else {
                                            const x =
                                                (userPosition.liquidity /
                                                    pool.liquidity) *
                                                pool.reserves[0]
                                            const dt = await deallocateGivenX( // dealloc can be simplified
                                                pool.id,
                                                parseEther(
                                                    (
                                                        (x * range) /
                                                        100
                                                    ).toString()
                                                )
                                            )
                                            await deallocate(
                                                pool?.id,
                                                dt[0],
                                                dt[1],
                                                dt[2]
                                            )
                                        }
                                    }
                                }}
                            >
                                {address === undefined
                                    ? 'Connect Wallet'
                                    : 'Confirm'}
                            </button>
                             * 
                             */}
                    </div>
                </div>
            </div>
        </section>
    )
}

function TokenPrices({ pool }: { pool: PoolWithTokensFragment }) {
    const chainId = useChainId()
    return (
        <section id="token-prices">
            <div className="flex flex-col gap-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Token Breakdown</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>

                <div className="flex flex-row gap-4">
                    {pool.poolTokens.items.map((poolToken, i) => {
                        return (
                            <div
                                key={i}
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

function Pool() {
    const { id } = useParams()
    const { address } = useAccount()
    const chainId = useChainId()
    // const { connectors, connect } = useConnect()
    // const { state } = usePrices();
    // const { prices } = state;
    const poolId = id ? id : '0' // return to pool #0 if null

    const [balances, setBalances] = useState<number[]>([])
    const [amount, setAmount] = useState<string>('') // numeraire input amount
    const [allocAmounts, setAllocAmounts] = useState<number[]>([]) // set by the return of allocateGivenNumeraire()

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

    useEffect(() => {
        setAllocAmounts([0, 0, 0, 0])
        async function fetchBalances() {
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
    console.log(balances)

    let userPosition: Position

    if (pool?.positions?.items && address) {
        userPosition = pool?.positions?.items?.find(
            (position) =>
                position.accountId.toLowerCase() ===
                address?.toLocaleLowerCase()
        )!
    }

    const [isAddLiquidity, setIsAddLiquidity] = useState<boolean>(true)
    const ref = useRef(null)
    const [range, setRange] = useState<number>(0)

    const isUserConnected = true // todo: fix

    if (!pool?.poolTokens?.items || !parameters) return <></>
    return (
        <div className="container mx-auto max-w-4xl my-8 flex flex-col gap-6">
            <Overview
                title="Superliquid Staked Ether"
                src={tokens[chainId][0].logo}
                alt="pool"
                pool={pool}
            />

            {isUserConnected && <UserActions pool={pool} />}

            <PoolInfo pool={pool} />
            <TokenPrices pool={pool} />
            <PoolBreakdown pool={pool} />
            <RecentTransactions pool={pool} />
        </div>
    )
}

export default Pool
