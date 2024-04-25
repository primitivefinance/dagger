import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HandlerAbi } from '@/lib/abis/handler'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAccount, useWriteContract } from 'wagmi'
import { config } from '../../App'
import { useTransactionStatus } from '@/components/TransactionButton/useTransactionStatus'
import { HANDLER_ADDRESS_OP_SEPOLIA } from '@/lib/handler'
import { useGraphQL } from '../../useGraphQL'
import {
    PoolWithTokensFragment,
    poolInfoQueryDocument,
} from '../../queries/pools'
import { useFragment } from '../../gql'
import { toWad } from '@/utils/numbers'

export const AUTHORIZED: `0x${string}`[] = [
    '0xcafeb94677aA303594ab56bd3A817E3227473254',
]

function Admin(): JSX.Element {
    const { id } = useParams()
    const navigate = useNavigate()

    const { address } = useAccount()

    const [recipient, setRecipient] = React.useState<`0x${string}`>(undefined)
    const { txReceipt, txHash, setTxHash } = useTransactionStatus({})

    const poolId = 0
    const { data } = useGraphQL(poolInfoQueryDocument, { id: poolId })
    const pool = useFragment(PoolWithTokensFragment, data?.pool)
    const tokens = pool?.poolTokens?.items?.map((item) => item.token.id)

    const { writeContract: onboard } = useWriteContract({
        config,
        mutation: {
            onSuccess: setTxHash,
        },
    })

    if (address && AUTHORIZED.includes(address))
        return (
            <div className="flex flex-col gap-2xl items-center justify-center min-h-screen mt-[-64px]">
                Authorized
                <div className="flex flex-col gap-md items-center justify-center">
                    <form>
                        <Input
                            placeholder={`0x...`}
                            value={recipient}
                            onChange={(e) =>
                                setRecipient(e.target.value as `0x${string}`)
                            }
                        />
                    </form>
                    <Button
                        variant="outline"
                        onClick={() =>
                            onboard({
                                abi: HandlerAbi,
                                address: HANDLER_ADDRESS_OP_SEPOLIA,
                                functionName: 'onboard',
                                args: [
                                    recipient,
                                    tokens,
                                    tokens?.map(() => toWad(100)),
                                    toWad(0.005),
                                ],
                            })
                        }
                    >
                        Onboard user
                    </Button>
                </div>
            </div>
        )

    return (
        <div className="flex flex-col gap-2xl items-center justify-center min-h-screen mt-[-64px]">
            <div className="flex flex-col gap-md items-center justify-center">
                Not authorized.
                <Button variant="outline" onClick={() => navigate(-1)}>
                    Go back
                </Button>
            </div>
        </div>
    )
}

export default Admin
