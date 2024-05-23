import { useState, useEffect } from 'react'

const SLIPPAGE_KEY = 'slippagePreference'

function useSlippagePreference(
    defaultSlippage: number = 0.01
): [number, (newSlippage: number) => void] {
    const [slippage, setSlippage] = useState<number>(() => {
        const storedSlippage = localStorage.getItem(SLIPPAGE_KEY)
        return storedSlippage ? parseFloat(storedSlippage) : defaultSlippage
    })

    useEffect(() => {
        localStorage.setItem(SLIPPAGE_KEY, slippage.toString())
    }, [slippage])

    const updateSlippage = (newSlippage: number): void => {
        setSlippage(newSlippage)
    }

    return [slippage, updateSlippage]
}

export default useSlippagePreference
