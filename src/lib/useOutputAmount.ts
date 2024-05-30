import { useOutputAmountContext } from '@/store/OutputAmountContext'

export function useOutputAmount(): {
    getOutputAmount: () => string | null
    setOutputAmount: (newAmount: string | null) => void
} {
    const { amount, setAmount } = useOutputAmountContext()

    const getOutputAmount = () => amount
    const setOutputAmount = (newAmount: string | null) => {
        setAmount(newAmount)
    }

    return { getOutputAmount, setOutputAmount }
}
