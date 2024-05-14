import { shortAddress } from '@/utils/address'
import { etherscanAddressLink, etherscanTxLink } from '@/utils/etherscan'
import { LinkIcon } from '../link-icon'
import { Button } from '../ui/button'
import { AddressZero } from 'viem'
import SkeletonText from '../SkeletonText'

export function EtherscanLink({
    address,
}: {
    address?: `0x${string}`
}): JSX.Element {
    return (
        <Button variant="link" size="xs" asChild>
            {address ? (
                <a
                    href={etherscanAddressLink(address)}
                    className="flex flex-row gap-1 leading-none h-auto"
                    target="_blank"
                    rel="noreferrer"
                >
                    <small>{shortAddress(address)}</small>
                    <LinkIcon />
                </a>
            ) : (
                <SkeletonText />
            )}
        </Button>
    )
}

export function EtherscanTxLink({
    txHash,
}: {
    txHash: `0x${string}`
}): JSX.Element {
    return (
        <a
            href={etherscanTxLink(txHash)}
            className="flex flex-row gap-1"
            target="_blank"
            rel="noreferrer"
        >
            <small>{shortAddress(txHash)}</small>
            <LinkIcon />
        </a>
    )
}

export function LabelWithEtherscan({
    label,
    address,
}: {
    label: React.ReactNode
    address?: `0x${string}`
}): JSX.Element {
    return (
        <div className="flex flex-row gap-sm items-center justify-between">
            {label}
            <EtherscanLink address={address} />
        </div>
    )
}

export function TxLabelEtherscan({
    label,
    txHash,
}: {
    label: React.ReactNode
    txHash: `0x${string}`
}): JSX.Element {
    return (
        <div className="flex flex-row gap-sm items-center justify-between">
            {label}
            <EtherscanTxLink txHash={txHash} />
        </div>
    )
}
