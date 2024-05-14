import { formatWad } from '@/utils/numbers'
import { TokenBadge } from '../PoolsTable'
import SkeletonText from '../SkeletonText'

/**
 * Wrapper component for displaying a list of token holdings with an icon, balance, and ticker.
 */
const TokenHoldings: React.FC<{ tokens: any[]; reserves: any[] }> = ({
    tokens,
    reserves,
}): JSX.Element => {
    return (
        <div className="flex flex-wrap items-center gap-xs">
            {tokens.map((token, index) => {
                const reserve = reserves[index]

                return (
                    <div
                        key={`${token?.id}-${index}`}
                        className="flex flex-row items-center gap-xs"
                    >
                        <TokenBadge
                            address={token?.id as `0x${string}`}
                            symbol={token?.symbol}
                        />
                        {reserve ? (
                            <span>{formatWad(reserve)}</span>
                        ) : (
                            <SkeletonText />
                        )}
                        {token?.symbol ? (
                            <small>{token.symbol.slice(0, 2)}</small>
                        ) : null}
                        {index === tokens.length - 1 ? null : (
                            <span className="text-dagger4">/</span>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default TokenHoldings
