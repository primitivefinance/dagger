import { useLocation, useNavigate } from 'react-router-dom'

export function useTradeRoute(): {
    getTokenIn: () => string | null
    getTokenOut: () => string | null
    setTokenParams: (tokenIn: string | null, tokenOut: string | null) => void
} {
    const loc = useLocation()
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(loc.search)

    const getTokenIn = () => queryParams.get('tokenIn')
    const getTokenOut = () => queryParams.get('tokenOut')

    const setTokenParams = (
        tokenIn: string | null,
        tokenOut: string | null
    ) => {
        if (tokenIn !== null) queryParams.set('tokenIn', tokenIn)
        else queryParams.delete('tokenIn')

        if (tokenOut !== null) queryParams.set('tokenOut', tokenOut)
        else queryParams.delete('tokenOut')

        navigate(
            {
                pathname: location.pathname,
                search: `?${queryParams.toString()}`,
            },
            { replace: true }
        )
    }

    return { getTokenIn, getTokenOut, setTokenParams }
}
