import { shortAddress } from '@/utils/address'
import { etherscanAddressLink, etherscanTxLink } from '@/utils/etherscan'
import { LinkIcon } from '../link-icon'
import { Button } from '../ui/button'

export function EtherscanLink({
    address,
}: {
    address: `0x${string}`
}): JSX.Element {
    return (
        <Button variant="link" size="xs">
            <a
                href={etherscanAddressLink(address)}
                className="flex flex-row gap-1"
                target="_blank"
                rel="noreferrer"
            >
                <small>{shortAddress(address)}</small>
                <LinkIcon />
            </a>
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
    address: `0x${string}`
}): JSX.Element {
    return (
        <div className="flex flex-row gap-1 items-center justify-between">
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
        <div className="flex flex-row gap-1 items-center justify-between">
            {label}
            <EtherscanTxLink txHash={txHash} />
        </div>
    )
}
