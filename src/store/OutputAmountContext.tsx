import React, { createContext, useContext, useState, ReactNode } from 'react'

interface OutputAmountContextType {
    amount: string | null
    setAmount: (amount: string | null) => void
}

const OutputAmountContext = createContext<OutputAmountContextType | undefined>(
    undefined
)

export const OutputAmountProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [amount, setAmount] = useState<string | null>(null)

    return (
        <OutputAmountContext.Provider value={{ amount, setAmount }}>
            {children}
        </OutputAmountContext.Provider>
    )
}

export const useOutputAmountContext = () => {
    const context = useContext(OutputAmountContext)
    if (!context) {
        throw new Error(
            'useOutputAmountContext must be used within an OutputAmountProvider'
        )
    }
    return context
}
