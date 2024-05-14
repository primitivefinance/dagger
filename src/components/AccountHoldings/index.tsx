import React, { useCallback } from 'react'
import {
    useAccount,
    useBalance,
    useEnsAvatar,
    useEnsName,
    useReadContracts,
} from 'wagmi'
import { normalize } from 'viem/ens'
import { erc20Abi, getAddress } from 'viem'
import { InfoCircledIcon } from '@radix-ui/react-icons'

import { FALLBACK_ALT, FALLBACK_AVATAR, shortAddress } from '@/utils/address'
import { Skeleton } from '../ui/skeleton'
import { formatWad } from '@/utils/numbers'
import { useTokens } from '@/lib/useTokens'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { TokenBadge } from '../PoolsTable'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '../ui/tooltip'

const DataItem = ({
    label,
    value,
    valueRaw,
    isLoading,
    dataType = 'value',
}: {
    label: React.ReactNode
    value: React.ReactNode
    valueRaw?: string
    isLoading?: boolean
    dataType?: 'address' | 'ens' | 'value'
}): JSX.Element => {
    const [isCopied, setIsCopied] = React.useState(false)

    const handleCopy = useCallback(() => {
        if (typeof valueRaw !== 'undefined') {
            navigator.clipboard
                .writeText(
                    dataType === 'address' ? getAddress(valueRaw) : valueRaw
                )
                .then(() => {
                    setIsCopied(true)
                    setTimeout(() => setIsCopied(false), 250) // Reset after 0.25 seconds
                })
                .catch((err) => {
                    console.error('Failed to copy text: ', err)
                })
        }
    }, [valueRaw, dataType])

    return (
        <div className="flex flex-col gap-xs w-full">
            <h5 className="text-muted-foreground">{label}</h5>
            {isLoading ? (
                <Skeleton className="w-full h-full">
                    <h4 className="text-transparent selection:text-transparent">
                        Loading
                    </h4>
                </Skeleton>
            ) : (
                <Tooltip>
                    <TooltipTrigger>
                        <h4
                            className={`text-left cursor-pointer ${isCopied ? 'copied-text-shimmer' : ''}`}
                            onClick={handleCopy}
                        >
                            {value}
                        </h4>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span
                            className={`cursor-pointer ${isCopied ? 'copied-text-shimmer' : ''}`}
                            onClick={handleCopy}
                        >
                            {dataType === 'address' && valueRaw
                                ? getAddress(valueRaw)
                                : valueRaw?.toString() ?? value}
                        </span>
                    </TooltipContent>
                </Tooltip>
            )}
        </div>
    )
}

const FALLBACK_ENS_NAME = 'Unknown'

/**
 * Displays the basic account info of the connected account including ENS name and ETH balance, if available.
 */
const AccountInfo = (): JSX.Element => {
    const { address, isConnecting, isReconnecting } = useAccount()
    const { data: ensName, isFetching: isFetchingName } = useEnsName({
        address,
    })
    const { data: ensAvatar } = useEnsAvatar({
        name: ensName ? normalize(ensName) : undefined,
    })
    const { data: ethBalance, isFetching: isFetchingBalance } = useBalance({
        address: address,
    })

    return (
        <div className={`flex flex-col gap-0 ${address ? 'border-b' : ''}`}>
            <div className="flex flex-row gap-sm border-b bg-muted/50 p-md">
                <h4>Portfolio</h4>
            </div>
            <div className="flex flex-row gap-md items-center justify-between py-lg px-md">
                {address ? (
                    <>
                        {address && (!isConnecting || !isReconnecting) ? (
                            <Avatar className="h-20 w-20">
                                <AvatarImage
                                    src={ensAvatar || FALLBACK_AVATAR}
                                    alt={ensName || FALLBACK_ALT}
                                />
                                <AvatarFallback>C</AvatarFallback>
                            </Avatar>
                        ) : (
                            <Avatar className="h-20 w-20">
                                <Skeleton className="w-full h-full"></Skeleton>
                            </Avatar>
                        )}

                        <DataItem
                            label="Account"
                            value={
                                ensName || address
                                    ? shortAddress(
                                          address as unknown as `0x${string}`
                                      )
                                    : FALLBACK_ENS_NAME
                            }
                            valueRaw={address}
                            isLoading={isFetchingName}
                        />

                        <DataItem
                            label="ETH Wealth"
                            value={
                                typeof ethBalance?.value !== 'undefined'
                                    ? formatWad(
                                          ethBalance?.value,
                                          ethBalance?.decimals
                                      )
                                    : 'n/a'
                            }
                            valueRaw={ethBalance?.value?.toString()}
                            isLoading={isFetchingBalance}
                        />
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center w-full">
                        <h4 className="text-muted dark:text-muted-foreground/50">
                            Connect to View Account
                        </h4>
                    </div>
                )}
            </div>
        </div>
    )
}

type BalanceReturnType =
    | {
          error?: undefined
          result: string | number | bigint
          status: 'success'
      }
    | {
          error: Error
          result?: undefined
          status: 'failure'
      }

/**
 * Dumb component that renders the token ticker, icon, and balance.
 */
const TokenBalance = ({
    ticker,
    token,
    balance,
    decimals = 18,
    isFetching,
}: {
    ticker?: string
    token?: `0x${string}`
    balance?: BalanceReturnType
    decimals?: number
    isFetching?: boolean
}): JSX.Element => {
    return (
        <div className="flex flex-col gap-sm items-center justify-center">
            {ticker ? (
                <h5 className="w-2xl text-muted-foreground truncate">
                    {ticker}
                </h5>
            ) : (
                <Skeleton className="w-full h-full">
                    <h4 className="text-transparent selection:text-transparent">
                        Loading
                    </h4>
                </Skeleton>
            )}
            <TokenBadge
                address={token}
                size="size-2xl"
                chainId={11155420}
                symbol={ticker}
            />
            {balance?.status && !isFetching ? (
                balance?.status === 'success' ? (
                    <Tooltip>
                        <TooltipTrigger>
                            <h4>
                                {formatWad(balance.result as bigint, decimals)}
                            </h4>
                        </TooltipTrigger>
                        <TooltipContent>
                            {balance.result.toString()}
                        </TooltipContent>
                    </Tooltip>
                ) : (
                    <h4 className="truncate">{balance?.error?.message}</h4>
                )
            ) : (
                <Skeleton className="w-full h-full">
                    <h4 className="text-transparent selection:text-transparent">
                        Loading
                    </h4>
                </Skeleton>
            )}
        </div>
    )
}

const Holdings = (): JSX.Element => {
    const { address, isConnecting, isReconnecting } = useAccount()
    const { data: allTokens } = useTokens({})

    // sorting is important here since we want to display the tokens in a consistent order
    const filteredSortedTokens = allTokens?.sort(
        (a: { id: string }, b: { id: string }) =>
            getAddress(a.id) > getAddress(b.id) ? 1 : -1
    )

    const balanceCall = {
        abi: erc20Abi,
        functionName: 'balanceOf',
        args: [address],
    }

    const { data: balances, isFetching } = useReadContracts({
        contracts: filteredSortedTokens?.map((token: { id: string }) => ({
            ...balanceCall,
            address: token.id as `0x${string}`,
        })),
    })

    if (
        typeof address === 'undefined' ||
        typeof filteredSortedTokens === 'undefined'
    )
        return <></>

    return (
        <div className="flex flex-col gap-0 border-b">
            <div className="flex flex-row gap-sm border-b bg-muted/50 p-md items-center">
                <h4>Holdings</h4>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex flex-row items-center gap-xs hover:text-primary">
                            <InfoCircledIcon />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        Your tokens held filtered by the markets&apos; tokens.
                    </TooltipContent>
                </Tooltip>
            </div>

            <div className="grid grid-cols-3 gap-sm items-center py-lg px-md">
                {isConnecting || isReconnecting
                    ? new Array(6)
                          .fill(null)
                          .map((_, index) => <TokenBalance key={index} />)
                    : filteredSortedTokens.map(
                          (
                              token: {
                                  id: string
                                  symbol: string
                                  decimals: number
                              },
                              i
                          ) => (
                              <TokenBalance
                                  key={`${token.id}-${token.symbol}`}
                                  token={token.id as `0x${string}`}
                                  ticker={token?.symbol}
                                  balance={balances?.[i]}
                                  decimals={token.decimals}
                                  isFetching={isFetching}
                              />
                          )
                      )}
            </div>
        </div>
    )
}

/**
 * Displays the ens name and eth balance of the connected account, along with its holdings based on the tokens of all markets.
 */
const AccountHoldings: React.FC = (): JSX.Element => {
    return (
        <div className="flex flex-col gap-0 border">
            <TooltipProvider delayDuration={100}>
                <AccountInfo />
                <Holdings />
            </TooltipProvider>
        </div>
    )
}

export default AccountHoldings
