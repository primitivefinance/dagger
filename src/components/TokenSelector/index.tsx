import React, { useState } from 'react'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { CaretDownIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'

import { Button } from '../ui/button'
import Modal from '../Modal'
import { Input } from '../ui/input'
import TokenBadge from '../TokenBadge'
import SkeletonText from '../SkeletonText'
import { useTokens } from '@/lib/useTokens'

type TokenSelectorProps = {
    setToken: (token: `0x${string}`) => void
    token?: { id: `0x${string}`; symbol: string; name: string }
    disabledTokens?: `0x${string}`[]
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
    token,
    setToken,
    disabledTokens,
}): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const {
        data: { sorted: sortedTokens },
    } = useTokens({})

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="depth" size="full">
                    <div className="flex flex-col items-start justify-start w-full px-md">
                        <div className="flex flex-row items-center truncate gap-sm justify-between w-full">
                            <TokenBadge
                                address={token?.id as `0x${string}`}
                                size="size-lg"
                                symbol={token?.symbol}
                            />
                            {token?.symbol ? (
                                <p className="truncate max-w-16">
                                    {token?.symbol}
                                </p>
                            ) : (
                                <SkeletonText />
                            )}
                            <CaretDownIcon className="size-md ml-1" />
                        </div>
                    </div>
                </Button>
            </DialogTrigger>
            <Modal isOpen={open} title="Select a token" toggle={setOpen}>
                <div className="flex flex-row gap-2 bg-dagger1 border-dagger2 border border-solid p-md rounded-lg items-center">
                    <MagnifyingGlassIcon className="size-lg" />
                    <Input
                        type="text"
                        placeholder="Search by symbol or address"
                        className="flex-grow"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex flex-row gap-4 items-center flex-wrap">
                    {sortedTokens?.map((tkn) => (
                        <div
                            key={`${tkn.id}-${tkn.symbol}`}
                            className={
                                disabledTokens?.includes(
                                    tkn.id as `0x${string}`
                                )
                                    ? 'flex flex-row gap-1 items-center border-dagger2 border border-solid rounded-full py-1 px-3 opacity-50'
                                    : 'cursor-pointer flex flex-row gap-1 items-center border-dagger2 border border-solid rounded-full py-1 px-3 hover:bg-accent'
                            }
                            onClick={() => {
                                setToken(tkn.id as `0x${string}`)
                                setOpen(false)
                            }}
                        >
                            <TokenBadge address={tkn.id} size="size-lg" />
                            {tkn?.symbol ? (
                                <span className="text-sm">{tkn.symbol}</span>
                            ) : (
                                <SkeletonText />
                            )}
                        </div>
                    ))}
                </div>
                <div
                    className="flex flex-col justify-center overflow-auto max-h-96"
                    style={{ scrollbarWidth: 'none' }}
                >
                    {sortedTokens
                        ?.filter(
                            (tkn) =>
                                tkn.name.includes(search) ||
                                tkn.symbol.includes(search)
                        )
                        .map((tkn) => (
                            <div
                                key={tkn.id}
                                className={
                                    disabledTokens?.includes(
                                        tkn.id as `0x${string}`
                                    )
                                        ? 'flex flew-row gap-3 items-center border border-transparent hover:border-dagger2 opacity-50 border-solid p-2 rounded-xl'
                                        : 'flex flew-row gap-3 items-center cursor-pointer border border-transparent hover:border-dagger2 hover:border hover:bg-accent border-solid p-2 rounded-xl'
                                }
                                onClick={() => {
                                    if (
                                        !disabledTokens?.includes(
                                            tkn.id as `0x${string}`
                                        )
                                    ) {
                                        setToken(tkn.id as `0x${string}`)
                                        setOpen(false)
                                    }
                                }}
                            >
                                <TokenBadge
                                    address={tkn.id}
                                    size="size-lg"
                                    symbol={tkn.symbol}
                                />
                                <div className="flex flex-col">
                                    <p className="text-left">{tkn.symbol}</p>
                                    <p className="text-left text-dagger3 text-sm">
                                        {tkn.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </Modal>
        </Dialog>
    )
}

export default TokenSelector
