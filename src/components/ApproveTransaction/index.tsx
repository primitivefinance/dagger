import { useEffect, useState } from 'react'
import { erc20Abi, getAddress } from 'viem'
import { useWriteContract, useChainId } from 'wagmi'

import { config } from '../../App'
import TransactionButton from '../TransactionButton'
import { dfmmAddress } from '@/data/contracts'
import { tokens } from '@/data/tokens'
import { toWad } from '@/utils/numbers'

type ApproveTransactionProps = {
    token: `0x${string}`
    amount: number | string
    setTxHash: (txHash: `0x${string}`) => void
    txHash?: `0x${string}`
    txReceipt?: any
    decimals?: number
}

/**
 * A stateful button that is "smart" about approval transactions and will
 * respond to the current state of the transaction and emit appropriate toasts.
 */
function ApproveTransaction({
    token,
    amount,
    setTxHash,
    txHash,
    txReceipt,
    decimals = 18,
}: ApproveTransactionProps): JSX.Element {
    const chainId = useChainId()

    const [tokenMeta, setTokenMeta] = useState<any>(undefined)

    useEffect(() => {
        const meta = tokens?.[chainId]?.find(
            (t) => getAddress(t.address) === getAddress(token)
        )
        setTokenMeta(meta)
    }, [])

    const {
        writeContract,
        isPending: isApproving,
        isError: approvalError,
        isSuccess: approvalSuccess,
        failureReason: approvalFailureReason,
        reset: resetApproval,
    } = useWriteContract({
        config,
        mutation: {
            onSuccess: setTxHash,
        },
    })

    const ButtonChild = () => {
        if (approvalError) {
            return <span className="text-red-500">Approval failed</span>
        }

        if (approvalSuccess) {
            return <span className="text-green-200">Approval sent</span>
        }

        if (isApproving) {
            return <span>Approving {tokenMeta?.symbol}...</span>
        }

        return <span>Approve</span>
    }

    return (
        <TransactionButton
            onClick={() =>
                writeContract({
                    abi: erc20Abi,
                    address: token,
                    functionName: 'approve',
                    args: [dfmmAddress, toWad(parseFloat(amount.toString()))],
                })
            }
            pattern
            isAwaitingWalletConfirmation={isApproving}
            isErrored={approvalError}
            isConfirmed={
                approvalSuccess &&
                typeof txHash !== 'undefined' &&
                typeof txReceipt !== 'undefined'
            }
            isReload={approvalError}
            isBroadcasting={
                typeof txHash !== 'undefined' &&
                typeof txReceipt === 'undefined'
            }
        >
            <ButtonChild />
        </TransactionButton>
    )
}

export default ApproveTransaction
