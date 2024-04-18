import { shortAddress } from '@/utils/address'
import { etherscanAddressLink, etherscanTxLink } from '@/utils/etherscan'
import { LinkIcon } from '../link-icon'

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
            <a
                href={etherscanAddressLink(address)}
                className="flex flex-row gap-1"
                target="_blank"
                rel="noreferrer"
            >
                <small>{shortAddress(address)}</small>
                <LinkIcon />
            </a>
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
            <a
                href={etherscanTxLink(txHash)}
                className="flex flex-row gap-1"
                target="_blank"
                rel="noreferrer"
            >
                <small>{shortAddress(txHash)}</small>
                <LinkIcon />
            </a>
        </div>
    )
}
