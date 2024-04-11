import React from 'react'
import { Button, ButtonProps } from '../ui/button'
import { CheckIcon, ReloadIcon } from '@radix-ui/react-icons'

export interface TransactionButtonProps extends ButtonProps {
    pattern?: boolean
    isAwaitingWalletConfirmation?: boolean
    isBroadcasting?: boolean
    isConfirmed?: boolean
    isErrored?: boolean
    isReload?: boolean
    isLoading?: boolean
}

const LoadingDots = () => {
    return (
        <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </div>
    )
}

/**
 * Used for all actions that interact with the connected chain.
 * This button uses special styling to show that we are making real transactions.
 * It's a stateful button that is responsive to the potential states of the transaction.
 */
const TransactionButton = React.forwardRef<
    HTMLButtonElement,
    TransactionButtonProps
>(({ children, ...props }, ref) => {
    const backgroundImage = `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='70' height='8' patternTransform='scale(2) rotate(30)'><rect x='0' y='0' width='100%' height='100%' fill='transparent'/><path d='M-.02 22c8.373 0 11.938-4.695 16.32-9.662C20.785 7.258 25.728 2 35 2c9.272 0 14.215 5.258 18.7 10.338C58.082 17.305 61.647 22 70.02 22M-.02 14.002C8.353 14 11.918 9.306 16.3 4.339 20.785-.742 25.728-6 35-6 44.272-6 49.215-.742 53.7 4.339c4.382 4.967 7.947 9.661 16.32 9.664M70 6.004c-8.373-.001-11.918-4.698-16.3-9.665C49.215-8.742 44.272-14 35-14c-9.272 0-14.215 5.258-18.7 10.339C11.918 1.306 8.353 6-.02 6.002'  stroke-width='1' stroke='hsla(258.5,59.4%,59.4%,0.5)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-26,-24)' fill='url(%23a)'/></svg>")`
    return (
        <Button
            {...props}
            ref={ref}
            variant="tx"
            size="lg"
            style={{
                backgroundImage: props.pattern ? backgroundImage : undefined,
            }}
            disabled={
                props.disabled ||
                props.isAwaitingWalletConfirmation ||
                props.isBroadcasting ||
                props.isLoading
            }
        >
            {props.isReload && <ReloadIcon />}
            {props.isErrored && 'Retry'}
            {props.isConfirmed && !props.isBroadcasting && <CheckIcon />}
            {(props.isAwaitingWalletConfirmation ||
                props.isBroadcasting ||
                props.isLoading) && <LoadingDots />}
            {children}
        </Button>
    )
})
TransactionButton.displayName = 'TransactionButton'

export default TransactionButton
