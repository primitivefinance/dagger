import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useAccount, useChainId, useConnect } from 'wagmi'

import { usePrices } from '../../store/PricesContext'
import { tokens } from '../../data/tokens'
import { shortAddress } from '../../utils/address'
import { computePrice, allocateGivenX, deallocateGivenX } from '../../lib/g3m'
import TokenAmountInput from '../../components/TokenAmountInput'
import { balanceOf } from '../../lib/erc20'
import { parseEther } from 'viem'
import { allocate, deallocate } from '../../lib/dfmm'
import { useGraphQL } from '../../useGraphQL'
import {
    PoolWithTokensFragment,
    poolInfoQueryDocument,
} from '../../queries/pools'
import { useFragment } from '../../gql'

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

function Pool() {
    const { id } = useParams()
    const { address } = useAccount()
    const chainId = useChainId()
    const { connectors, connect } = useConnect()
    // const { state } = usePrices();
    // const { prices } = state;

    const [balances, setBalances] = useState<{ [key: string]: number }>({})
    const [amounts, setAmounts] = useState<{ [key: string]: number }>({})

    const [amountX, setAmountX] = useState<string>('')
    const [amountY, setAmountY] = useState<string>('')
    const { data } = useGraphQL(poolInfoQueryDocument, { id })
    const pool = useFragment(PoolWithTokensFragment, data?.pool)

    useEffect(() => {
        async function fetchBalances() {
            if (!pool?.poolTokens?.items) return

            const newBalances: { [key: string]: number } = {}

            for (const poolToken of pool.poolTokens.items) {
                const balance = await balanceOf(poolToken.token.id, address!)
                newBalances[poolToken.token.symbol] = balance
            }
            setBalances(newBalances)
            console.log('balances', newBalances)
        }

        if (address && pool?.poolTokens?.items) {
            console.log('fetching balances')
            fetchBalances()
        }
    }, [address, pool?.poolTokens?.items])

    let userPosition: Position

    if (pool && address) {
        userPosition = pool.positions.items.find(
            (position) =>
                position.accountId.toLowerCase() ===
                address?.toLocaleLowerCase()
        )!
    }

    const [isAddLiquidity, setIsAddLiquidity] = useState<boolean>(true)
    const ref = useRef(null)
    const [range, setRange] = useState<number>(0)

    if (pool?.poolTokens === undefined) return <></>

    return (
        <div className="container mx-auto max-w-4xl my-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                    <div className="flex flex-row items-center">
                        {pool.poolTokens.items.map((poolToken) => {
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
                                        alt={poolToken.token.symbol}
                                        className="rounded-full size-8"
                                        style={{
                                            zIndex: 1,
                                            opacity: '70%',
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
                                        {poolToken.token.symbol}
                                    </div>
                                </>
                            )
                        })}
                    </div>
                    <h1>
                        {pool?.tokenX.symbol}/{pool?.tokenY.symbol}
                    </h1>
                    <div className="flex flex-initial flex-row gap-2">
                        <div className="self-center bg-blue-600 px-2 rounded-full text-[14px]">
                            {pool?.parameters.swapFee}%
                        </div>
                        <div className="self-center bg-purple-600 px-2 rounded-full text-[14px]">
                            {pool?.strategy.name}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-5">
                    <div className="flex gap-1 items-center">
                        <p className="font-bold">{pool?.tokenX.symbol}</p>
                        <a
                            href={`https://sepolia-optimistic.etherscan.io/address/${pool?.poolTokens[0].id}`}
                            className="flex flex-row gap-1 text-sm"
                        >
                            {shortAddress(pool?.poolTokens[0].id)} <LinkIcon />
                        </a>
                    </div>
                    <div className="flex gap-1 items-center">
                        <p className="font-bold">
                            {pool?.poolTokens[1].symbol}
                        </p>
                        <a
                            href={`https://sepolia-optimistic.etherscan.io/address/${pool?.poolTokens[1].id}`}
                            className="flex flex-row gap-1 text-sm"
                        >
                            {shortAddress(pool?.poolTokens[1].id)} <LinkIcon />
                        </a>
                    </div>
                    <div className="flex gap-1 items-center">
                        <p className="font-bold">{pool?.name}</p>
                        <a
                            href={`https://sepolia-optimistic.etherscan.io/address/${pool.lpToken}`}
                            className="flex flex-row gap-1 text-sm"
                        >
                            {shortAddress(pool?.lpToken)} <LinkIcon />
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-4">
                <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-2 flex flex-row gap-2 items-center">
                    <img
                        src={tokenYLogo}
                        alt={pool?.poolTokens[1].symbol}
                        className="rounded-full size-6"
                    />
                    <p className="text-sm">
                        {computePrice(
                            pool.reserveX,
                            pool.reserveY,
                            pool.parameters.weightX,
                            pool.parameters.weightY
                        ).toLocaleString(undefined)}{' '}
                        {pool.tokenY.symbol}{' '}
                        <span className="text-xs">
                            per {pool.tokenX.symbol}
                        </span>
                    </p>
                </div>
                <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-2 flex flex-row gap-2 items-center">
                    <img
                        src={tokenXLogo}
                        alt={pool.tokenX.symbol}
                        className="rounded-full size-6"
                    />
                    <p className="text-sm">
                        {computePrice(
                            pool.reserveY,
                            pool.reserveX,
                            pool.parameters.weightY,
                            pool.parameters.weightX
                        ).toLocaleString(undefined, {
                            maximumFractionDigits: 8,
                        })}{' '}
                        {pool.tokenX.symbol}{' '}
                        <span className="text-xs">
                            per {pool.tokenY.symbol}
                        </span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-8">
                    <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-4 self-start w-full">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <p className="text-lg font-bold">My Position</p>
                                <p className="text-dagger3 text-xs">
                                    $
                                    {userPosition!
                                        ? (userPosition.liquidity /
                                              pool.liquidity) *
                                              pool.reserveX *
                                              prices[pool.tokenX.symbol] +
                                          (userPosition.liquidity /
                                              pool.liquidity) *
                                              pool.reserveY *
                                              prices[pool.tokenY.symbol]
                                        : '0.0'}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-row gap-1 items-center">
                                    <img
                                        src={tokenXLogo}
                                        alt={pool.tokenX.symbol}
                                        className="rounded-full size-4"
                                    />
                                    <p className="text-xs text-dagger3">
                                        {pool.tokenX.symbol}
                                    </p>
                                </div>
                                <p className="font-bold">
                                    {userPosition!
                                        ? (userPosition.liquidity /
                                              pool.liquidity) *
                                          pool.reserveX
                                        : '0.0'}{' '}
                                    {pool.tokenX.symbol}{' '}
                                    <span className="text-xs font-normal text-dagger3">
                                        ($
                                        {userPosition!
                                            ? (userPosition!.liquidity /
                                                  pool.liquidity) *
                                              pool.reserveX *
                                              prices[pool.tokenX.symbol]
                                            : '0.0'}
                                        )
                                    </span>
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-row gap-1 items-center">
                                    <img
                                        src={tokenYLogo}
                                        alt={pool.tokenY.symbol}
                                        className="rounded-full size-4"
                                    />
                                    <p className="text-xs text-dagger3">
                                        {pool.tokenY.symbol}
                                    </p>
                                </div>
                                <p className="font-bold">
                                    {userPosition!
                                        ? (
                                              (userPosition.liquidity /
                                                  pool.liquidity) *
                                              pool.reserveY
                                          ).toLocaleString(undefined)
                                        : '0.0'}{' '}
                                    {pool.tokenY.symbol}{' '}
                                    <span className="text-xs font-normal text-dagger3">
                                        ($
                                        {userPosition!
                                            ? (userPosition!.liquidity /
                                                  pool.liquidity) *
                                              pool.reserveY *
                                              prices[pool.tokenY.symbol]
                                            : '0.0'}
                                        )
                                    </span>
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-dagger3">
                                    Total Liquidity
                                </p>
                                <p className="font-bold">
                                    {userPosition!
                                        ? userPosition.liquidity.toLocaleString(
                                              undefined
                                          )
                                        : '0.0'}
                                </p>
                            </div>
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
                                        <p className="text-lg font-bold">
                                            Add Liquidity
                                        </p>
                                        <p className="text-dagger3 text-xs">
                                            Increase your position by adding
                                            liquidity into the pool.
                                        </p>
                                    </div>
                                    <TokenAmountInput
                                        tokenAddress={pool.tokenX.id}
                                        tokenSymbol={pool.tokenX.symbol}
                                        tokenBalance={balanceX}
                                        tokenLogo={tokenXLogo!}
                                        tokenPrice={prices[pool.tokenX.id]}
                                        amount={amountX}
                                        setAmount={setAmountX}
                                    />
                                    <TokenAmountInput
                                        tokenAddress={pool.tokenY.id}
                                        tokenSymbol={pool.tokenY.symbol}
                                        tokenBalance={balanceY}
                                        tokenLogo={tokenYLogo!}
                                        tokenPrice={prices[pool.tokenY.id]}
                                        amount={amountY}
                                        setAmount={setAmountY}
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col">
                                        <p className="text-lg font-bold">
                                            Remove Liquidity
                                        </p>
                                        <p className="text-dagger3 text-xs">
                                            Decrease your position by removing
                                            liquidity from the pool.
                                        </p>
                                    </div>
                                    <div className="flex flex-row justify-between items-center">
                                        <p className="text-xl">{range}%</p>
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
                                        <p className="text-dagger3 text-xs">
                                            You'll receive at least
                                        </p>
                                        <p className="text-dagger4 text-sm">
                                            {userPosition!
                                                ? (
                                                      ((userPosition.liquidity /
                                                          pool.liquidity) *
                                                          pool.reserveX *
                                                          range) /
                                                      100
                                                  ).toLocaleString(undefined)
                                                : '0.0'}
                                        </p>
                                        <img
                                            src={tokenXLogo}
                                            alt={pool.tokenX.symbol}
                                            className="rounded-full size-4"
                                        />
                                        <p className="text-dagger4 text-sm">
                                            {pool.tokenX.symbol}
                                        </p>
                                        <p className="text-dagger3 text-xs">
                                            and
                                        </p>
                                        <p className="text-dagger4 text-sm">
                                            {userPosition!
                                                ? (
                                                      ((userPosition.liquidity /
                                                          pool.liquidity) *
                                                          pool.reserveY *
                                                          range) /
                                                      100
                                                  ).toLocaleString(undefined)
                                                : '0.0'}
                                        </p>
                                        <img
                                            src={tokenYLogo}
                                            alt={pool.tokenY.symbol}
                                            className="rounded-full size-4"
                                        />
                                        <p className="text-dagger4 text-sm">
                                            {pool.tokenY.symbol}
                                            <span className="text-dagger3">
                                                .
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            )}
                            <button
                                onClick={async () => {
                                    if (address === undefined) {
                                        connect({ connector: connectors[0] })
                                    } else {
                                        if (isAddLiquidity) {
                                            const data = await allocateGivenX(
                                                pool.id,
                                                parseEther(amountX)
                                            )
                                            await allocate(
                                                pool.id,
                                                data[0],
                                                data[1],
                                                data[2]
                                            )
                                        } else {
                                            const x =
                                                (userPosition.liquidity /
                                                    pool.liquidity) *
                                                pool.reserveX
                                            const data = await deallocateGivenX(
                                                pool.id,
                                                parseEther(
                                                    (
                                                        (x * range) /
                                                        100
                                                    ).toString()
                                                )
                                            )
                                            await deallocate(
                                                pool.id,
                                                data[0],
                                                data[1],
                                                data[2]
                                            )
                                        }
                                    }
                                }}
                            >
                                {address === undefined
                                    ? 'Connect Wallet'
                                    : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-4 self-start w-full">
                        <div className="grid gap-4 grid-cols-2">
                            <div className="flex flex-col col-span-2">
                                <p className="text-lg font-bold">Statistics</p>
                                <p className="text-dagger3 text-xs">
                                    Lorem ipsum at dolor simet.
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-dagger3">TVL</p>
                                <p className="font-bold">
                                    $
                                    {(
                                        pool.reserveX *
                                            prices[pool.tokenX.symbol] +
                                        pool.reserveY *
                                            prices[pool.tokenY.symbol]
                                    ).toLocaleString(undefined)}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-dagger3">
                                    Volume (24h)
                                </p>
                                <p className="font-bold">$0.0</p>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-row gap-1 items-center">
                                    <img
                                        src={tokenXLogo}
                                        alt={pool.tokenX.symbol}
                                        className="rounded-full size-4"
                                    />
                                    <p className="text-xs text-dagger3">
                                        {pool.tokenX.symbol}
                                    </p>
                                </div>
                                <p className="font-bold">
                                    {pool.reserveX.toLocaleString(undefined)}{' '}
                                    {pool.tokenX.symbol}{' '}
                                    <span className="text-xs font-normal text-dagger3">
                                        ($
                                        {(
                                            prices[pool.tokenX.symbol] *
                                            pool.reserveX
                                        ).toLocaleString(undefined)}
                                        )
                                    </span>
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-dagger3">
                                    Fees (24h)
                                </p>
                                <p className="font-bold">$0.0</p>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-row gap-1 items-center">
                                    <img
                                        src={tokenYLogo}
                                        alt={pool.tokenY.symbol}
                                        className="rounded-full size-4"
                                    />
                                    <p className="text-xs text-dagger3">
                                        {pool.tokenY.symbol}
                                    </p>
                                </div>
                                <p className="font-bold">
                                    {pool.reserveY.toLocaleString(undefined)}{' '}
                                    {pool.tokenY.symbol}{' '}
                                    <span className="text-xs font-normal text-dagger3">
                                        ($
                                        {(
                                            prices[pool.tokenY.symbol] *
                                            pool.reserveY
                                        ).toLocaleString(undefined)}
                                        )
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-4 self-start w-full">
                        <div className="grid gap-4 grid-cols-2">
                            <div className="flex flex-col col-span-2">
                                <p className="text-lg font-bold">
                                    Pool Details
                                </p>
                                <p className="text-dagger3 text-xs">
                                    Specific pool parameters goes here.
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-dagger3">Strategy</p>
                                <p className="font-bold">
                                    {pool.strategy.name}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-dagger3">Fee Rate</p>
                                <p className="font-bold">
                                    {pool.parameters.swapFee}%
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-dagger3">
                                    Controller
                                </p>
                                <a
                                    href="#"
                                    className="flex flex-row gap-1 font-bold"
                                >
                                    {shortAddress(
                                        pool.parameters
                                            .controller as `0x${string}`
                                    )}{' '}
                                    <LinkIcon />
                                </a>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-dagger3">Weight X</p>
                                <p className="font-bold">
                                    {pool.parameters.weightX}%
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xs text-dagger3">Weight Y</p>
                                <p className="font-bold">
                                    {pool.parameters.weightX}%
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-4 self-start w-full">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col">
                                <p className="text-lg font-bold">Strategy</p>
                                <p className="text-dagger3 text-xs">
                                    {pool.strategy.name}
                                </p>
                            </div>
                            <p className="text-sm text-dagger3">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nulla nec dui eget urna aliquet
                                aliquam.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-8">
                <p className="text-lg font-bold mb-2">Recent Transactions</p>
                <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid">
                    <table>
                        <thead>
                            <tr>
                                <th className="text-left">Action</th>
                                <th>
                                    <div className="flex flex-row gap-1 items-center justify-end">
                                        <img
                                            src={tokenXLogo}
                                            alt={pool.tokenX.symbol}
                                            className="rounded-full size-4"
                                        />
                                        <p className="text-xs text-dagger3">
                                            {pool.tokenX.symbol}
                                        </p>
                                    </div>
                                </th>
                                <th>
                                    <div className="flex flex-row gap-1 items-center justify-end">
                                        <img
                                            src={tokenYLogo}
                                            alt={pool.tokenY.symbol}
                                            className="rounded-full size-4"
                                        />
                                        <p className="text-xs text-dagger3">
                                            {pool.tokenY.symbol}
                                        </p>
                                    </div>
                                </th>
                                <th className="text-right">Value</th>
                                <th className="text-right">Account</th>
                                <th className="text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-left font-bold">
                                    Add liquidity
                                </td>
                                <td className="text-right">1.432</td>
                                <td className="text-right">2,414.42</td>
                                <td className="text-right">$4,256</td>
                                <td className="text-right">
                                    <a
                                        href="#"
                                        className="flex flex-row gap-1 font-bold justify-end"
                                    >
                                        0xbeef...cafe <LinkIcon />
                                    </a>
                                </td>
                                <td className="text-right text-sm">
                                    3 hours ago
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Pool
