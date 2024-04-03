import { useState } from 'react'
import { tokens } from '../../data/tokens'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
import { Button } from '../ui/button'
import { CaretDownIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Modal from '../Modal'
import { Input } from '../ui/input'

type TokenSelectorProps = {
    tokenLogo: string
    tokenSymbol: string
    setToken: (token: `0x${string}`) => void
}

function TokenSelector(props: TokenSelectorProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary">
                    <div className="flex flex-row gap-2 items-center">
                        <div className="flex flex-row items-center">
                            <img
                                src={props.tokenLogo}
                                alt={props.tokenSymbol}
                                className="rounded-full h-4 w-4 mr-2"
                            />
                            {props.tokenSymbol}
                            <CaretDownIcon className="h-4 w-4 ml-1" />
                        </div>
                    </div>
                </Button>
            </DialogTrigger>
            <Modal isOpen={open} title="Select a token" toggle={setOpen}>
                <div className="flex flex-row gap-2 bg-dagger1 border-dagger2 border border-solid p-2 rounded-lg items-center">
                    <MagnifyingGlassIcon className="h-4 w-4" />
                    <Input
                        type="text"
                        placeholder="Search by symbol or address"
                        className="flex-grow"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex flex-row gap-4 items-center flex-wrap">
                    {tokens.map((token) => (
                        <div
                            key={token.address}
                            className="cursor-pointer flex flex-row gap-1 items-center border-dagger2 border border-solid rounded-full py-1 px-3 hover:opacity-50"
                            onClick={() => {
                                props.setToken(token.address)
                                setOpen(false)
                            }}
                        >
                            <img
                                src={token.logo}
                                alt={token.symbol}
                                className="rounded-full size-4"
                            />
                            <span className="text-sm">{token.symbol}</span>
                        </div>
                    ))}
                </div>
                <div
                    className="flex flex-col justify-center overflow-auto max-h-96"
                    style={{ scrollbarWidth: 'none' }}
                >
                    {tokens
                        .filter(
                            (token) =>
                                token.name.includes(search) ||
                                token.symbol.includes(search)
                        )
                        .map((token) => (
                            <div
                                key={token.address}
                                className="flex flew-row gap-3 items-center cursor-pointer border border-transparent hover:border-dagger2 hover:border border-solid p-2 rounded-xl"
                                onClick={() => {
                                    props.setToken(token.address)
                                    close()
                                }}
                            >
                                <img
                                    src={token.logo}
                                    alt={token.symbol}
                                    className="rounded-full size-10"
                                />
                                <div className="flex flex-col">
                                    <p className="text-left">{token.symbol}</p>
                                    <p className="text-left text-dagger3 text-sm">
                                        {token.name}
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
