import Moralis from 'moralis'
import { useState, useEffect } from 'react'

export const useUSDPrice = (chainId: number, address: `0x${string}`) => {
    const [price, setPrice] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        const fetchPrice = async () => {
            try {
                await Moralis.start({
                    apiKey: import.meta.env.VITE_MORALIS_API,
                })
                const response = await Moralis.EvmApi.token.getTokenPrice({
                    chain: `0x${chainId}`,
                    include: 'percent_change',
                    address: address,
                })
                setPrice(response.raw.usdPriceFormatted)
            } catch (e) {
                console.log(e)
            }
        }
        fetchPrice().then(() => setLoading(false))
    }, [])

    return { price, loading }
}
