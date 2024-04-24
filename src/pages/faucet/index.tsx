import { useAccount, useChainId } from 'wagmi'

import { tokens } from '../../data/tokens'
import { mint } from '../../lib/erc20'
import { Button } from '@/components/ui/button'
import React from 'react'

function Faucet(): JSX.Element {
    const { address } = useAccount()
    const chainId = useChainId()

    const [step, setStep] = React.useState(1)

    return (
        <div className="flex flex-col gap-2xl">
            <div className="flex flex-row gap-lg justify-between mx-auto w-1/3 items-center">
                <h3
                    className={`${step === 0 ? 'text-primary' : 'text-muted-foreground'}`}
                >
                    Step 1
                </h3>
                <h3
                    className={`${step === 0 ? 'text-primary' : 'text-muted-foreground'}`}
                >
                    Connect
                </h3>
                <Button variant="tx" disabled>
                    Connect Wallet
                </Button>
            </div>
            <div className="flex flex-row flex-wrap gap-lg justify-center max-w-sm m-auto py-8">
                {tokens[chainId].map((token) => (
                    <Button
                        variant="secondary"
                        key={token.address}
                        onClick={async () =>
                            await mint(
                                token.address as `0x${string}`,
                                address!,
                                token.faucet!,
                                token.decimals
                            )
                        }
                    >
                        <img
                            src={token.logo}
                            alt={token.symbol}
                            className="rounded-full size-4 mr-2"
                        />
                        Mint {token.symbol}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default Faucet
