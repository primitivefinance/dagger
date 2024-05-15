import { useAccount, useChainId } from 'wagmi'

import { tokens } from '../../data/tokens'
import { mint } from '../../lib/erc20'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { useTokens } from '@/lib/useTokens'
import TokenBadge from '@/components/TokenBadge'

const DiscordAddressForm = () => {
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await fetch('/api/discordWebhook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: `New user onboard request: ${address}`,
                }),
            })

            if (response.ok) {
                setMessage('Onboarding pending approval.')
                setAddress('') // Clear the input
            } else {
                const data = await response.json()
                setMessage(data.error || 'An error occurred.')
            }
        } catch (error) {
            setMessage('Failed to send the address.')
        }
        setLoading(false)
    }

    return (
        <div className="flex flex-col items-center space-y-4">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 w-64"
            >
                <Input
                    type="string"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    required
                />
                <Button type="submit" disabled={loading}>
                    Onboard
                </Button>
            </form>
            {message && (
                <p className="text-center mt-4 text-green-600">{message}</p>
            )}
        </div>
    )
}

function Faucet(): JSX.Element {
    const { address } = useAccount()
    const chainId = useChainId()

    const [step, setStep] = React.useState(1)
    const {
        data: { sorted: sortedTokens },
    } = useTokens({})

    return (
        <div className="flex flex-col gap-2xl">
            <div className="flex flex-row gap-lg justify-between mx-auto w-1/3 items-center">
                <DiscordAddressForm />
            </div>
            <div className="flex flex-row flex-wrap gap-lg justify-center max-w-sm m-auto py-8">
                {sortedTokens?.map((token) => (
                    <Button
                        variant="secondary"
                        key={token.id}
                        onClick={async () =>
                            await mint(
                                token.id as `0x${string}`,
                                address!,
                                token.faucet!,
                                token.decimals
                            )
                        }
                    >
                        <TokenBadge address={token.id} size="size-lg" />
                        Mint {token.symbol}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default Faucet
