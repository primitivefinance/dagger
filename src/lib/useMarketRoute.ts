import React from 'react'
import { useParams } from 'react-router-dom'
import { FALLBACK_MARKET_ADDRESS } from '@/utils/address'

/**
 * Uses either the market address of a page being viewed or a default route.
 * todo: Will enable market routes to be chosen as a setting in a future release.
 */
export function useMarketRoute(): {
    id: `0x${string}`
    setRoute: (id: `0x${string}`) => void
} {
    const { id } = useParams()

    const [marketRoute, setMarketRoute] = React.useState(
        FALLBACK_MARKET_ADDRESS as `0x${string}`
    )

    React.useEffect(() => {
        setMarketRoute((id as `0x${string}`) ?? FALLBACK_MARKET_ADDRESS)
    }, [id])

    return { id: marketRoute as `0x${string}`, setRoute: setMarketRoute }
}
