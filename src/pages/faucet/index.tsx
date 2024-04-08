import { useAccount, useChainId } from 'wagmi'

import { tokens } from '../../data/tokens'
import { mint } from '../../lib/erc20'
import { Button } from '@/components/ui/button'

function Faucet() {
    const { address } = useAccount()
    const chainId = useChainId()
    return (
        <div className="flex flex-row flex-wrap gap-4 justify-center max-w-sm m-auto py-8">
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
    )
}

export default Faucet
