import { useAccount } from 'wagmi'

import { tokens } from '../../data/tokens'
import { mint } from '../../lib/erc20'
import { Button } from '@/components/ui/button'

function Faucet() {
    const { address } = useAccount()

    return (
        <div className="flex flex-row flex-wrap gap-4 justify-center max-w-sm m-auto py-8">
            {tokens.map((token) => (
                <Button
                    variant="secondary"
                    key={token.address}
                    onClick={async () =>
                        await mint(
                            token.address,
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
