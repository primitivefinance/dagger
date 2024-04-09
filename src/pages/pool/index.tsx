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

function Overview({ src, alt }: { src: string; alt: string }) {
    return (
        <section id="overview">
            <div className="flex flex-col gap-lg">
                <img
                    src={src}
                    alt={alt}
                    className="rounded-full size-24"
                    style={{
                        zIndex: 1,
                        opacity: '70%',
                    }}
                />
                <div className="flex flex-col gap-md">
                    <h3>Overview</h3>
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

    const isUserConnected = address !== undefined

    if (!pool?.poolTokens?.items || !parameters) return <></>
    return (
        <div className="container mx-auto max-w-4xl my-8 flex flex-col gap-6">
            <Overview src={tokens[chainId][0].logo} alt="pool" />

            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                    <div className="flex flex-row items-center">
                        <div className="flex flex-initial flex-row gap-2 mr-10">
                            <div className="self-center bg-purple-600 px-2 rounded-full text-[18px]">
                                {pool?.name}
                            </div>
                        </div>
                        {pool?.poolTokens?.items?.map((poolToken) => {
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
                <hr />
                <div className="flex flex-row items-center gap-5">
                    {pool.poolTokens.items.map((poolToken, i) => {
                        return (
                            <div key={i} className="flex gap-1 items-center">
                                <p className="font-bold">
                                    {poolToken.token.symbol}
                                </p>
                                <a
                                    href={`https://sepolia-optimistic.etherscan.io/address/${poolToken?.token?.id}`}
                                    className="flex flex-row gap-1"
                                >
                                    {shortAddress(
                                        poolToken?.token?.id as `0x${string}`
                                    )}
                                    <LinkIcon />
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="flex flex-row gap-4">
                {pool.poolTokens.items.map((poolToken, i) => {
                    return (
                        <div
                            key={i}
                            className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-2 flex flex-row gap-2 items-center"
                        >
                            <img
                                src={
                                    tokens[chainId].find(
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
                                    {pool?.poolTokens?.items[0].token.symbol}
                                </small>
                            </p>
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-8">
                    <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-4 self-start w-full">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row items-center justify-between">
                                <p>My Position</p>
                                <p>
                                    {userPosition!
                                        ? (userPosition.liquidity /
                                              pool.liquidity) *
                                          pool.reserves[0]
                                        : '0.0'}{' '}
                                    {' LPT'}
                                </p>
                            </div>
                            <hr />
                            {pool.poolTokens.items.map((poolToken, i) => {
                                return (
                                    <div key={i} className="flex flex-col">
                                        <div className="flex flex-row w-full gap-1 items-center">
                                            <img
                                                src={
                                                    tokens[chainId].find(
                                                        (tkn) =>
                                                            tkn.symbol.toLowerCase() ===
                                                            poolToken.token.symbol.toLowerCase()
                                                    )?.logo
                                                }
                                                alt={poolToken.token.symbol}
                                                className="rounded-full size-4"
                                            />
                                            <p>{poolToken.token.symbol}</p>
                                        </div>
                                        <div className="w-full flex-row justify-between">
                                            <>
                                                {userPosition!
                                                    ? (userPosition.liquidity /
                                                          pool?.liquidity) *
                                                      pool.reserves[i]
                                                    : '0.0'}{' '}
                                                {
                                                    pool?.poolTokens?.items[i]
                                                        .token.symbol
                                                }{' '}
                                            </>
                                        </div>
                                        <div className="w-full flex-row justify-between">
                                            <>
                                                {'Token Balance: '}
                                                {balances[i]}{' '}
                                                {
                                                    pool?.poolTokens?.items[i]
                                                        .token.symbol
                                                }{' '}
                                            </>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-4 self-start w-full">
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 border-solid border border-dagger2 w-full rounded-xl">
                                <button
                                    className={`border-0 ${
                                        isAddLiquidity
                                            ? 'bg-dagger2'
                                            : 'border-0'
                                    }`}
                                    onClick={() => setIsAddLiquidity(true)}
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
                                    className={`border-0 ${
                                        isAddLiquidity
                                            ? 'border-0'
                                            : 'bg-dagger2'
                                    }`}
                                    onClick={() => setIsAddLiquidity(false)}
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
                                        <p>Add Liquidity</p>
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
                                                            {
                                                                poolToken.token
                                                                    .symbol
                                                            }
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
                                        <p>Remove Liquidity</p>
                                        <p>
                                            Decrease your position by removing
                                            liquidity from the pool.
                                        </p>
                                    </div>
                                    <div className="flex flex-row justify-between items-center">
                                        <p>{range}%</p>
                                        <div className="flex flex-row gap-2">
                                            <button
                                                onClick={() => setRange(25)}
                                            >
                                                25%
                                            </button>
                                            <button
                                                onClick={() => setRange(50)}
                                            >
                                                50%
                                            </button>
                                            <button
                                                onClick={() => setRange(75)}
                                            >
                                                75%
                                            </button>
                                            <button
                                                onClick={() => setRange(100)}
                                            >
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
                                            setRange(
                                                parseInt(e.target.value, 10)
                                            )
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
                                                            {
                                                                poolToken.token
                                                                    .symbol
                                                            }
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

                <div className="flex flex-col gap-8">
                    <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-4 self-start w-full">
                        <div className="grid gap-4 grid-cols-2">
                            <div className="flex flex-col col-span-2">
                                <h3>Pool Details</h3>
                            </div>
                            <div className="flex flex-col">
                                <p>Strategy</p>
                                <p className="font-bold">{pool.name}</p>
                            </div>
                            <div className="flex flex-col">
                                <p>Fee Rate</p>
                                <p className="font-bold">
                                    {parameters.swapFee}%
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p>Controller</p>
                                <a
                                    href="#"
                                    className="flex flex-row gap-1 font-bold"
                                >
                                    {shortAddress(
                                        parameters.controller as `0x${string}`
                                    )}{' '}
                                    <LinkIcon />
                                </a>
                            </div>
                            <div className="flex flex-col">
                                {pool?.strategy?.name !== 'ConstantSum' ? (
                                    parameters.lastComputedWeights.map(
                                        (weight: number, i: number) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className="flex flex-col"
                                                >
                                                    <p>Weight #{i}</p>
                                                    <p className="font-bold">
                                                        {(weight / 1e18) * 100}%
                                                    </p>
                                                </div>
                                            )
                                        }
                                    )
                                ) : (
                                    <>
                                        {parameters.lastComputedPrice}{' '}
                                        {pool.poolTokens.items[0].token.symbol}
                                    </>
                                )}
                            </div>
                        </div>
                        <br />
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col col-span-2">
                                <h4>Pool Reserves</h4>
                            </div>
                            <hr />
                            {pool.poolTokens.items.map((poolToken, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="flex flex-col justify-between"
                                    >
                                        <div className="flex flex-row w-full gap-1 items-center">
                                            <img
                                                src={
                                                    tokens[chainId].find(
                                                        (tkn) =>
                                                            tkn.symbol.toLowerCase() ===
                                                            poolToken.token.symbol.toLowerCase()
                                                    )?.logo
                                                }
                                                alt={poolToken.token.symbol}
                                                className="rounded-full size-4"
                                            />
                                            <p>{poolToken.token.symbol}</p>
                                        </div>
                                        <div className="w-full flex-row justify-between">
                                            <p>
                                                {pool.reserves[i]}
                                                {
                                                    pool?.poolTokens?.items[i]
                                                        .token.symbol
                                                }{' '}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-4 self-start w-full">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <h4>Strategy</h4>
                                <p>{pool.name}</p>
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
        </div>
    )
}

export default Pool
