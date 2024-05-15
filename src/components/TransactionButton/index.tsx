import React, { useEffect, useState } from 'react'
import { Button, ButtonProps } from '../ui/button'
import { CheckIcon, ReloadIcon } from '@radix-ui/react-icons'
import { useSimulateContract, useWriteContract } from 'wagmi'

import { config } from '../../App'
import { Abi, Address, StateOverride, TransactionReceipt, erc20Abi } from 'viem'
import { dfmmABI } from '@/lib/abis/dfmm'
import { rmmABI } from '@/lib/abis/rmm'

export interface TransactionButtonProps extends ButtonProps {
    from?: Address
    to: Address
    contractName?: 'dfmm' | 'erc20' | 'rmm'
    functionName: string
    args: any[]
    txHash?: `0x${string}`
    txReceipt?: TransactionReceipt
    setTxHash: (txHash: `0x${string}`) => void
    stateOverride?: StateOverride
    value?: bigint
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
export const TransactionButtonStyled = React.forwardRef<
    HTMLButtonElement,
    ButtonProps
>(({ children, ...props }, ref) => {
    const backgroundImage = `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='70' height='8' patternTransform='scale(2) rotate(30)'><rect x='0' y='0' width='100%' height='100%' fill='transparent'/><path d='M-.02 22c8.373 0 11.938-4.695 16.32-9.662C20.785 7.258 25.728 2 35 2c9.272 0 14.215 5.258 18.7 10.338C58.082 17.305 61.647 22 70.02 22M-.02 14.002C8.353 14 11.918 9.306 16.3 4.339 20.785-.742 25.728-6 35-6 44.272-6 49.215-.742 53.7 4.339c4.382 4.967 7.947 9.661 16.32 9.664M70 6.004c-8.373-.001-11.918-4.698-16.3-9.665C49.215-8.742 44.272-14 35-14c-9.272 0-14.215 5.258-18.7 10.339C11.918 1.306 8.353 6-.02 6.002'  stroke-width='1' stroke='hsla(258.5,59.4%,59.4%,0.5)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-26,-24)' fill='url(%23a)'/></svg>")`
    return (
        <Button
            {...props}
            ref={ref}
            variant="tx"
            size="lg"
            style={{
                backgroundImage,
            }}
        >
            {children}
        </Button>
    )
})
TransactionButtonStyled.displayName = 'TransactionButton'

/**
 * All possible supported states for a transaction.
 */
enum TransactionState {
    Resting = 'Resting',
    Simulating = 'Simulating',
    AwaitingSignature = 'AwaitingSignature',
    Error = 'Tx Error',
    Broadcasted = 'Tx Broadcasted',
    Confirmed = 'Tx Confirmed',
    SimulateReady = 'SimulateReady',
    SimulateStale = 'SimulateStale',
    TriggerSimulate = 'TriggerSimulate',
    SimulateFetching = 'SimulateFetching',
    SimulateError = 'SimulateError',
    TransactionReady = 'TransactionReady',
}

type TransactionAction =
    | { type: 'REST' }
    | { type: 'SIMULATE_TRANSACTION' }
    | { type: 'AWAIT_SIGNATURE' }
    | { type: 'TRANSACTION_ERROR' }
    | { type: 'BROADCAST_TRANSACTION' }
    | { type: 'CONFIRM_TRANSACTION' }
    | { type: 'SIMULATE_READY' }
    | { type: 'SIMULATE_STALE' }
    | { type: 'TRIGGER_SIMULATE' }
    | { type: 'SIMULATE_FETCHING' }
    | { type: 'SIMULATE_ERROR' }
    | { type: 'TRANSACTION_READY' }

function transactionReducer(
    state: TransactionState,
    action: TransactionAction
): TransactionState {
    switch (action.type) {
        case 'TRANSACTION_READY':
            return TransactionState.TransactionReady
        case 'AWAIT_SIGNATURE':
            return TransactionState.AwaitingSignature
        case 'BROADCAST_TRANSACTION':
            if (state === TransactionState.Confirmed) {
                return state
            }
            return TransactionState.Broadcasted
        case 'CONFIRM_TRANSACTION':
            return TransactionState.Confirmed
        case 'TRANSACTION_ERROR':
            return TransactionState.Error
        case 'SIMULATE_READY':
            return TransactionState.SimulateReady
        case 'TRIGGER_SIMULATE':
            return TransactionState.TriggerSimulate
        case 'SIMULATE_TRANSACTION':
            return TransactionState.Simulating
        case 'SIMULATE_FETCHING':
            return TransactionState.SimulateFetching
        case 'SIMULATE_ERROR':
            return TransactionState.SimulateError
        case 'SIMULATE_STALE':
            return TransactionState.SimulateStale
        case 'REST':
        default:
            return TransactionState.Resting
    }
}

/**
 * @notice A stateful button that handles all possible transaction states.
 * @dev Some issues with this component:
 * - complex state management logic
 * - state management changes with useEffect
 * - conditions can be overridden based on ordering
 * - parent component re-renders will reset the state, making the state
 * dependent on the props
 * - just be careful using this component until we get enough tests for it.
 */
function TransactionButton(props: TransactionButtonProps): JSX.Element {
    const [state, dispatch] = React.useReducer(
        transactionReducer,
        TransactionState.Resting
    )

    const simulation = useSimulateContract({
        abi:
            props.contractName === 'rmm'
                ? rmmABI
                : props.contractName === 'dfmm'
                  ? dfmmABI
                  : props.contractName === 'erc20'
                    ? erc20Abi
                    : ({} as Abi),
        address: props.to,
        functionName: props.functionName,
        args: props.args,
        value: props.value,
        stateOverride: props.stateOverride,
        query: {
            enabled:
                state === TransactionState.TriggerSimulate ||
                state === TransactionState.TransactionReady,
            refetchInterval: false,
            staleTime: 5 * 1000,
        },
    })

    const transaction = useWriteContract({
        config,
        mutation: {
            onSuccess: props.setTxHash,
            onMutate: (v) => {
                dispatch({ type: 'SIMULATE_STALE' })
            },
        },
    })

    const [localReceipt, setLocalReceipt] = useState<
        TransactionReceipt | undefined
    >(undefined)

    useEffect(() => {
        setLocalReceipt(props.txReceipt)
    }, [props.txReceipt])

    // Handle state changes based on prop changes.
    useEffect(() => {
        if (
            typeof props.args === 'undefined' ||
            props.args.some((arg) => typeof arg === 'undefined')
        ) {
            dispatch({ type: 'REST' })
            return
        }

        if (typeof simulation?.data === 'undefined') {
            dispatch({ type: 'SIMULATE_READY' })
        }
    }, [props.from, props.args, simulation?.data])

    // Handle state changes based on the simulation query.
    useEffect(() => {
        // If a transaction is in flight or awaiting signature, we don't want to
        // create a race condition with state transitions from the simulation query.
        if (
            state === TransactionState.AwaitingSignature ||
            state === TransactionState.Broadcasted ||
            state === TransactionState.Confirmed ||
            typeof localReceipt !== 'undefined'
        ) {
            return
        }

        if (simulation?.error) {
            dispatch({ type: 'SIMULATE_ERROR' })
            console.error(simulation.failureReason)
            return
        }

        if (simulation?.isStale) {
            dispatch({ type: 'SIMULATE_STALE' })
            return
        }

        if (simulation?.isFetching) {
            dispatch({ type: 'SIMULATE_FETCHING' })
            return
        }

        if (simulation?.data && !simulation?.isStale) {
            dispatch({ type: 'TRANSACTION_READY' })
            return
        }

        if (simulation?.isLoading) {
            dispatch({ type: 'SIMULATE_FETCHING' })
            return
        }
    }, [simulation, state, localReceipt])

    // React to changes in the requested transaction.
    useEffect(() => {
        if (transaction?.isError) {
            dispatch({ type: 'TRANSACTION_ERROR' })
        }

        if (transaction?.isPending) {
            dispatch({ type: 'AWAIT_SIGNATURE' })
        }
    }, [transaction])

    // React to changes in a broadcasted transaction.
    useEffect(() => {
        if (
            typeof props.txHash !== 'undefined' &&
            typeof localReceipt !== 'undefined'
        ) {
            dispatch({ type: 'CONFIRM_TRANSACTION' })
        }

        if (
            typeof props.txHash !== 'undefined' &&
            typeof localReceipt === 'undefined'
        ) {
            dispatch({ type: 'BROADCAST_TRANSACTION' })
        }
    }, [props.txHash, localReceipt])

    const ButtonAction = ({
        functionName,
        transactionState,
    }: {
        functionName: string
        transactionState: TransactionState
    }): JSX.Element => {
        const defaultState = <span>Type an amount</span>
        const action =
            functionName.slice(0, 1).toUpperCase() + functionName.slice(1)

        switch (transactionState) {
            case TransactionState.Resting:
                return defaultState
            case TransactionState.SimulateReady:
                return (
                    <span>
                        Simulate {props.functionName.toLocaleLowerCase()}
                    </span>
                )
            case TransactionState.SimulateStale:
                return (
                    <span>
                        Resimulate {props.functionName.toLocaleLowerCase()}
                    </span>
                )
            case TransactionState.SimulateFetching:
                return <span>Simulating...</span>
            case TransactionState.SimulateError:
                return <span>Simulate failed</span>
            case TransactionState.TransactionReady:
                return <span>{action}</span>
            case TransactionState.AwaitingSignature:
                return <span>Awaiting signature...</span>
            case TransactionState.Broadcasted:
                return <span>Transaction pending...</span>
            case TransactionState.Confirmed:
                return (
                    <span className="text-green-200">{action} confirmed</span>
                )
            case TransactionState.Error:
                return <span className="text-red-500">{action} failed</span>

            default:
                return defaultState
        }
    }

    type ButtonStateProps = {
        isReload?: boolean
        isErrored?: boolean
        isConfirmed?: boolean
        isBroadcasting?: boolean
        isAwaitingWalletConfirmation?: boolean
        isLoading?: boolean
    }

    const ButtonState = (buttonStateProps: ButtonStateProps): JSX.Element => {
        return (
            <>
                {buttonStateProps.isReload && <ReloadIcon />}
                {buttonStateProps.isErrored && 'Retry'}
                {buttonStateProps.isConfirmed &&
                    !buttonStateProps.isBroadcasting && <CheckIcon />}
                {(buttonStateProps.isAwaitingWalletConfirmation ||
                    buttonStateProps.isBroadcasting ||
                    buttonStateProps.isLoading) && <LoadingDots />}
            </>
        )
    }

    if (
        state == TransactionState.Resting ||
        state === TransactionState.SimulateReady ||
        state === TransactionState.SimulateStale ||
        state === TransactionState.SimulateFetching ||
        state === TransactionState.SimulateError ||
        state === TransactionState.TriggerSimulate
    ) {
        return (
            <TransactionButtonStyled
                disabled={
                    props.disabled ||
                    state === TransactionState.SimulateFetching ||
                    state === TransactionState.Resting
                }
                onClick={() => {
                    dispatch({ type: 'TRIGGER_SIMULATE' })

                    if (state === TransactionState.SimulateStale) {
                        simulation?.refetch()
                    }
                }}
            >
                <ButtonState
                    isLoading={state === TransactionState.SimulateFetching}
                    isErrored={state === TransactionState.SimulateError}
                    isConfirmed={
                        simulation?.isSuccess &&
                        state !== TransactionState.SimulateStale
                    }
                    isReload={
                        state === TransactionState.SimulateStale ||
                        state === TransactionState.SimulateError
                    }
                />
                <ButtonAction
                    functionName={props.functionName}
                    transactionState={state}
                />
            </TransactionButtonStyled>
        )
    }

    return (
        <TransactionButtonStyled
            disabled={
                props.disabled ||
                state === TransactionState.AwaitingSignature ||
                state === TransactionState.Broadcasted ||
                state === TransactionState.Confirmed
            }
            onClick={() =>
                transaction.writeContract({
                    abi:
                        props.contractName === 'dfmm'
                            ? dfmmABI
                            : props.contractName === 'erc20'
                              ? erc20Abi
                              : ({} as Abi),
                    address: props.to,
                    functionName: props.functionName,
                    args: props.args,
                    value: props.value,
                })
            }
        >
            <ButtonState
                isErrored={state === TransactionState.Error}
                isConfirmed={state === TransactionState.Confirmed}
                isReload={state === TransactionState.Error}
                isBroadcasting={state === TransactionState.Broadcasted}
                isAwaitingWalletConfirmation={
                    state === TransactionState.AwaitingSignature
                }
                isLoading={
                    state === TransactionState.AwaitingSignature ||
                    state === TransactionState.Broadcasted
                }
            />
            <ButtonAction
                functionName={props.functionName}
                transactionState={state}
            />
        </TransactionButtonStyled>
    )
}

export default TransactionButton
