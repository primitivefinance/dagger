import { useEffect, useState } from 'react'
import { useWaitForTransactionReceipt } from 'wagmi'
import { useToast } from '../ui/use-toast'
import { ToastAction } from '../ui/toast'
import { CheckCircledIcon } from '@radix-ui/react-icons'

const OP_SEPOLIA_ETHERSCAN = 'https://sepolia-optimistic.etherscan.io/'

export const ToastActionViewEtherscan = ({
    blockExplorerUrl,
    txHash,
}: {
    blockExplorerUrl: string
    txHash?: string
}): JSX.Element => (
    <ToastAction
        altText="View on Etherscan"
        onClick={() => {
            if (!txHash) return

            window.open(`${blockExplorerUrl}/tx/${txHash}`, '_blank')
        }}
    >
        View on Etherscan
    </ToastAction>
)

export const txSuccessToast = (
    blockExplorerUrl: string = OP_SEPOLIA_ETHERSCAN,
    txHash?: string
) => ({
    title: 'Success',
    description: (
        <span className="flex flex-row gap-sm items-center">
            <CheckCircledIcon color="#34d399" fontSize={28} />
            <small>Your transaction has been confirmed.</small>
        </span>
    ),
    action: (
        <ToastActionViewEtherscan
            blockExplorerUrl={blockExplorerUrl}
            txHash={txHash}
        />
    ),
})

export const txPendingToast = (
    blockExplorerUrl: string = OP_SEPOLIA_ETHERSCAN,
    txHash?: string
) => ({
    title: 'Transaction pending',
    description: 'Your transaction is being processed.',
    action: (
        <ToastActionViewEtherscan
            blockExplorerUrl={blockExplorerUrl}
            txHash={txHash}
        />
    ),
})

export const txErrorToast = (retryTx?: () => void) => ({
    variant: 'destructive' as const,
    title: 'Uh oh! Something went wrong.',
    description: 'There was a problem with your request ',
    action: (
        <ToastAction altText="Try again" onClick={retryTx}>
            Try again
        </ToastAction>
    ),
})

/**
 * @notice A single transaction status watcher. New txs override the last one. todo: make it a queue
 */
export const useTransactionStatus = ({
    retryTx,
}: {
    retryTx?: () => void
}): {
    setTxHash: (txHash: `0x${string}`) => void
    txReceipt: any | undefined
    txHash: `0x${string}` | undefined
} => {
    const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined)
    const { toast } = useToast()
    const {
        data: txReceipt,
        isSuccess,
        isError,
    } = useWaitForTransactionReceipt({
        hash: txHash,
    })

    useEffect(() => {
        if (txHash) {
            toast(txPendingToast(OP_SEPOLIA_ETHERSCAN, txHash))
        }

        if (isSuccess && txReceipt) {
            toast(txSuccessToast(OP_SEPOLIA_ETHERSCAN, txHash))

            setTimeout(() => {
                setTxHash(undefined)
            }, 3000)
        } else if (isError) {
            toast(txErrorToast(retryTx))
            // Reset txHash to be ready for the next transaction
            setTimeout(() => {
                setTxHash(undefined)
            }, 3000)
        }
        // This effect should only run when `isSuccess` or `isError` changes.
    }, [isSuccess, isError, txReceipt, toast, retryTx, setTxHash, txHash])

    return { setTxHash, txReceipt, txHash }
}
