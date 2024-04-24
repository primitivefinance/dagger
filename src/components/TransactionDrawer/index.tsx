import { useAccount, useChainId, useReadContracts } from 'wagmi'
import { erc20Abi, getAddress } from 'viem'
import { shortAddress } from '@/utils/address'
import { tokens } from '@/data/tokens'
import { formatWad } from '@/utils/numbers'

import { LabelWithEtherscan } from '../EtherscanLinkLabels'
import { TokenAmountInactive } from '../TokenAmountInput/inactive'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../ui/sheet'
import { Table, TableHead, TableHeader, TableRow } from '../ui/table'
import { PoolTokenItemFragment } from 'gql/graphql'

export type TransactionDrawerProps = {
    transactionTokens: PoolTokenItemFragment[]
    deltas: number[]
    openButton: React.ReactNode
    txTitle: React.ReactNode
    txDescription: React.ReactNode
    txForm: React.ReactNode
    txSubmit: React.ReactNode
    externalEtherscanLinks: { name: string; label: string; address: string }[]
}

/**
 * @notice Use this drawer container for all real transactions.
 */
function TransactionDrawer({
    transactionTokens,
    deltas,
    openButton,
    txTitle,
    txDescription,
    txForm,
    txSubmit,
    externalEtherscanLinks,
}: TransactionDrawerProps): JSX.Element {
    const chainId = useChainId()
    const { address } = useAccount()

    const balanceCalls = useReadContracts({
        contracts: transactionTokens.map((pt: PoolTokenItemFragment) => ({
            abi: erc20Abi,
            address: pt.token.id as `0x${string}`,
            functionName: 'balanceOf',
            args: [address],
        })),
    })

    return (
        <Sheet>
            <SheetTrigger className="bg-blue-600 rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 w-full">
                {openButton}
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader className="max-w-4xl mx-auto justify-center flex flex-col gap-sm">
                    <SheetTitle>{txTitle}</SheetTitle>
                    <SheetDescription>{txDescription}</SheetDescription>
                </SheetHeader>
                <div className="max-w-4xl my-8 mx-auto justify-center flex flex-row gap-2xl">
                    <div
                        id="deposit-form"
                        className="flex flex-col gap-xl w-1/2"
                    >
                        <div className="flex flex-col gap-sm">
                            <h4>Amount</h4>
                            {txForm}
                        </div>

                        <div className="flex flex-col gap-sm">
                            <h4>Breakdown</h4>

                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="w-1/4 justify-left">
                                            Token
                                        </TableHead>
                                        <TableHead className="w-1/4 justify-left">
                                            Balance
                                        </TableHead>
                                        <TableHead className="w-1/4 justify-left">
                                            Delta
                                        </TableHead>
                                        <TableHead className="w-1/4 justify-left">
                                            Value
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                            </Table>
                        </div>
                        <div className="flex flex-col gap-md w-full">
                            <div className="flex flex-col gap-sm w-full">
                                {transactionTokens?.map(
                                    (pt: PoolTokenItemFragment, i) => {
                                        const tokenAddress = pt.token
                                            .id as `0x${string}`
                                        const balance = parseFloat(
                                            formatWad(
                                                balanceCalls?.data?.[i]
                                                    ?.result ?? 0n
                                            )
                                        )
                                        const logo =
                                            tokens[chainId].find(
                                                (tkn) =>
                                                    tkn.symbol.toLowerCase() ===
                                                    pt.token.symbol.toLowerCase()
                                            )?.logo ||
                                            tokens[chainId]?.filter(
                                                (tkn) =>
                                                    getAddress(tkn.address) ===
                                                    getAddress(
                                                        transactionTokens?.[0]
                                                            ?.token?.id
                                                    )
                                            )[0]?.logo

                                        return (
                                            <TokenAmountInactive
                                                key={pt?.token?.id}
                                                disabled
                                                tokenAddress={tokenAddress}
                                                tokenSymbol={pt.token.symbol}
                                                tokenBalance={balance}
                                                tokenLogo={logo}
                                                tokenPrice={3000} // no price provider
                                                amount={
                                                    deltas?.[i]?.toString() ??
                                                    '0'
                                                }
                                                setAmount={() => {}}
                                            />
                                        )
                                    }
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-md w-full text-sm">
                            <div className="flex flex-row gap-sm justify-between w-full py-2 border-t">
                                <p>Total</p>
                                <p>$100,100.00</p>
                            </div>
                        </div>
                    </div>
                    <div
                        id="deposit-review"
                        className="flex flex-col w-1/2 gap-lg"
                    >
                        <div className="flex flex-col gap-sm">
                            <h4>Payment information</h4>
                            <div className="flex flex-row gap-xs justify-between w-full">
                                <p className="text-muted dark:text-muted-foreground">
                                    From
                                </p>
                                <p>
                                    <LabelWithEtherscan
                                        label={shortAddress(address!)}
                                        address={address!}
                                    />
                                </p>
                            </div>

                            {externalEtherscanLinks.map((item) => (
                                <div
                                    key={item.address}
                                    className="flex flex-row gap-xs justify-between w-full"
                                >
                                    <p className="text-muted dark:text-muted-foreground">
                                        {item.name}
                                    </p>
                                    <p>
                                        <LabelWithEtherscan
                                            label={item.label}
                                            address={
                                                item.address as `0x${string}`
                                            }
                                        />
                                    </p>
                                </div>
                            ))}
                        </div>

                        {txSubmit}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default TransactionDrawer
