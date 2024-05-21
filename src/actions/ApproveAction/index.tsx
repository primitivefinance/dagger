import React from 'react'
import TransactionButton from '@/components/TransactionButton'
import { toWad } from '@/utils/numbers'
import { useAccount } from 'wagmi'
import { TransactionReceipt } from 'viem'

const ApproveAction: React.FC<{
    token: `0x${string}`
    spender: `0x${string}`
    txHash?: `0x${string}`
    setTxHash: (txHash: `0x${string}`) => void
    txReceipt: TransactionReceipt
    amount?: string
}> = ({
    token,
    spender,
    txHash,
    setTxHash,
    txReceipt,
    amount,
}): JSX.Element => {
    const { address } = useAccount()
    const preparedAmount = amount && toWad(parseFloat(amount))

    if (!preparedAmount || !address) {
        return <TransactionButton disabled />
    }

    return (
        <TransactionButton
            contractName="erc20"
            to={token}
            args={[spender, preparedAmount]}
            functionName="approve"
            from={address as `0x${string}`}
            setTxHash={setTxHash}
            txReceipt={txReceipt}
            txHash={txHash}
        />
    )
}

export default ApproveAction
