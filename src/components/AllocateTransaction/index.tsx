import { useEffect, useState } from 'react'
import { Address, TransactionReceipt } from 'viem'
import { useWriteContract, useSimulateContract, useAccount } from 'wagmi'

import { dfmmAddress } from '@/data/contracts'
import { dfmmABI } from '@/lib/abis/dfmm'
import { overrideAllowanceDFMM } from '@/utils/simulate'

import { config } from '../../App'
import TransactionButton from '../TransactionButton'

type AllocateTransactionProps = {
    poolId: number
    tokens: Address[]
    payload?: string
    setTxHash: (txHash: `0x${string}`) => void
    txHash?: `0x${string}`
    txReceipt?: TransactionReceipt
}

/**
 * Possible states of transactions in general.
 */
enum TransactionState {
    Resting = 'Resting',
    Simulating = 'Simulating',
    AwaitingSignature = 'AwaitingSignature',
    Error = 'Tx Error',
    Broadcasted = 'Tx Broadcasted',
    Confirmed = 'Tx Confirmed',
}

/**
 * Possible states of the allocate transaction and its button.
 */
enum AllocateState {
    SimulateReady = 'SimulateReady',
    SimulateStale = 'SimulateStale',
    TriggerSimulate = 'TriggerSimulate',
    SimulateFetching = 'SimulateFetching',
    SimulateError = 'SimulateError',
    AllocateReady = 'AllocateReady',
}

type AllocateTransactionState = TransactionState | AllocateState

/**
 * A stateful button that is "smart" about approval transactions and will
 * respond to the current state of the transaction and emit appropriate toasts.
 */
function AllocateTransaction({
    poolId,
    tokens,
    payload,
    setTxHash,
    txHash,
    txReceipt,
}: AllocateTransactionProps): JSX.Element {
    const { address: owner } = useAccount()
    const [state, setState] = useState<AllocateTransactionState>(
        TransactionState.Resting
    )

    const simulation = useSimulateContract({
        abi: dfmmABI,
        address: dfmmAddress,
        functionName: 'allocate',
        args: [poolId, payload],
        stateOverride: tokens.map((token) => {
            return {
                address: token,
                stateDiff: [overrideAllowanceDFMM(owner as `0x${string}`)],
            }
        }),
        query: {
            enabled: state === AllocateState.TriggerSimulate,
            refetchInterval: false,
            staleTime: 5 * 1000,
        },
    })

    const transaction = useWriteContract({
        config,
        mutation: {
            onSuccess: setTxHash,
        },
    })

    // Handle state changes based on prop changes.
    useEffect(() => {
        setState(TransactionState.Resting)

        if (
            typeof payload !== 'undefined' &&
            typeof poolId !== 'undefined' &&
            typeof owner !== 'undefined'
        ) {
            setState(AllocateState.SimulateReady)
        }
    }, [poolId, payload, owner])

    // Handle state changes based on the simulation query.
    useEffect(() => {
        // If a transaction is in flight or awaiting signature, we don't want to
        // create a race condition with state transitions from the simulation query.
        if (
            state === TransactionState.AwaitingSignature ||
            state === TransactionState.Broadcasted ||
            state === TransactionState.Confirmed
        ) {
            return
        }

        if (simulation?.isStale) {
            setState(AllocateState.SimulateStale)
        }

        if (simulation?.isFetching) {
            setState(AllocateState.SimulateFetching)
        }

        if (simulation?.data) {
            setState(AllocateState.AllocateReady)
        }

        if (simulation?.error) {
            setState(AllocateState.SimulateError)
            console.error(simulation.failureReason)
        }

        if (simulation?.isLoading) {
            setState(AllocateState.SimulateFetching)
        }
    }, [simulation, state])

    // React to changes in the transaction status.
    useEffect(() => {
        if (typeof txReceipt !== 'undefined') {
            setState(TransactionState.Confirmed)
        }

        if (typeof txHash !== 'undefined' && typeof txReceipt === 'undefined') {
            setState(TransactionState.Broadcasted)
        }
    }, [txHash, txReceipt])

    useEffect(() => {
        if (transaction?.isError) {
            setState(TransactionState.Error)
        }

        if (transaction?.isPending) {
            setState(TransactionState.AwaitingSignature)
        }

        if (transaction?.isSuccess) {
            setState(TransactionState.Broadcasted)
        }
    }, [transaction])

    const ButtonChild = (): JSX.Element => {
        const defaultState = <span>Type an amount</span>

        switch (state) {
            case AllocateState.SimulateReady:
                return <span>Simulate deposit</span>
            case AllocateState.SimulateStale:
                return <span>Resimulate deposit</span>
            case AllocateState.SimulateFetching:
                return <span>Simulating...</span>
            case AllocateState.SimulateError:
                return <span>Simulate failed</span>
            case AllocateState.AllocateReady:
                return <span>Deposit</span>
            case TransactionState.Resting:
                return defaultState
            case TransactionState.AwaitingSignature:
                return <span>Awaiting signature...</span>
            case TransactionState.Broadcasted:
                return <span>Depositing...</span>
            case TransactionState.Confirmed:
                return <span className="text-green-200">Deposit confirmed</span>
            case TransactionState.Error:
                return <span className="text-red-500">Deposit failed</span>

            default:
                return defaultState
        }
    }

    if (
        state == TransactionState.Resting ||
        state === AllocateState.SimulateReady ||
        state === AllocateState.SimulateStale ||
        state === AllocateState.SimulateFetching ||
        state === AllocateState.SimulateError ||
        state === AllocateState.TriggerSimulate
    ) {
        return (
            <TransactionButton
                onClick={() => {
                    setState(AllocateState.TriggerSimulate)

                    if (state === AllocateState.SimulateStale) {
                        simulation?.refetch()
                    }
                }}
                pattern
                isLoading={state === AllocateState.SimulateFetching}
                isErrored={state === AllocateState.SimulateError}
                isConfirmed={
                    simulation?.isSuccess &&
                    state !== AllocateState.SimulateStale
                }
                isReload={
                    state === AllocateState.SimulateStale ||
                    state === AllocateState.SimulateError
                }
                disabled={
                    state === AllocateState.SimulateFetching ||
                    state === TransactionState.Resting
                }
            >
                <ButtonChild />
            </TransactionButton>
        )
    }

    return (
        <TransactionButton
            onClick={() =>
                transaction.writeContract({
                    abi: dfmmABI,
                    address: dfmmAddress,
                    functionName: 'allocate',
                    args: [poolId, payload],
                })
            }
            pattern
            isAwaitingWalletConfirmation={
                state === TransactionState.AwaitingSignature
            }
            isErrored={state === TransactionState.Error}
            isConfirmed={state === TransactionState.Confirmed}
            isReload={state === TransactionState.Error}
            isBroadcasting={state === TransactionState.Broadcasted}
            disabled={state === TransactionState.Confirmed}
        >
            <ButtonChild />
        </TransactionButton>
    )
}

export default AllocateTransaction
