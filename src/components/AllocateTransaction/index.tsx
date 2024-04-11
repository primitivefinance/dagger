import { useEffect, useState } from 'react'
import { Address, erc20Abi, getAddress, maxUint256, numberToHex } from 'viem'
import {
    useWriteContract,
    useChainId,
    useSimulateContract,
    useAccount,
} from 'wagmi'

import { dfmmAddress } from '@/data/contracts'

import { config } from '../../App'
import TransactionButton from '../TransactionButton'
import { dfmmABI } from '@/lib/abis/dfmm'
import { computeAllowanceSlot } from '@/utils/simulate'

type AllocateTransactionProps = {
    poolId: number
    tokens: Address[]
    payload?: string
    setTxHash: (txHash: `0x${string}`) => void
    txHash?: `0x${string}`
    txReceipt?: any
}

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
    const spender = dfmmAddress
    const maxAllowance = numberToHex(maxUint256)

    const [toSimulate, setToSimulate] = useState<boolean>(false)
    const [toDeposit, setToDeposit] = useState<boolean>(false)

    const {
        data: simulation,
        isLoading: isSimulating,
        isError: simulationFailed,
        isSuccess: simulationSuccess,
        refetch: refetchSimulation,
        failureReason: simulationFailureReason,
        isStale: isSimulateStale,
        isFetching: isSimulateFetching,
    } = useSimulateContract({
        abi: dfmmABI,
        address: dfmmAddress,
        functionName: 'allocate',
        args: [poolId, payload],
        stateOverride: tokens.map((token) => {
            return {
                address: token,
                stateDiff: [
                    {
                        slot: computeAllowanceSlot(
                            owner as `0x${string}`,
                            spender
                        ),
                        value: maxAllowance,
                    },
                ],
            }
        }),
        query: {
            enabled: toSimulate && typeof owner !== 'undefined',
            refetchInterval: false,
            staleTime: 5 * 1000,
        },
    })

    useEffect(() => {
        setToSimulate(false)
    }, [poolId, payload])

    useEffect(() => {
        if (simulation) {
            console.log('Simulation result:', simulation)
        }

        if (simulationFailed) {
            console.log('params', poolId, payload)
            console.log('Simulation failed:', simulationFailureReason)
        }
    }, [simulation, simulationFailed, simulationFailureReason, poolId, payload])

    const { writeContract, isPending, isError, isSuccess } = useWriteContract({
        config,
        mutation: {
            onSuccess: setTxHash,
        },
    })

    const needsInput = typeof payload === 'undefined'
    const needsSimulation = typeof simulation === 'undefined'
    const needsResimulation = isSimulateStale && !isPending && !toDeposit
    const awaitingDepositSignature = typeof txHash === 'undefined' && isPending
    const awaitingDepositConfirmation =
        typeof txReceipt === 'undefined' && typeof txHash !== 'undefined'

    const ButtonChild = () => {
        if (needsInput) {
            return <span>Type an amount</span>
        }

        if (needsSimulation) {
            return <span>Simulate deposit</span>
        }

        if (isSimulating || isSimulateFetching) {
            return <span>Simulating...</span>
        }

        if (needsResimulation) {
            return <span>Resimulate deposit</span>
        }

        if (isError) {
            return <span className="text-red-500">Deposit failed</span>
        }

        if (isSuccess) {
            return <span className="text-green-200">Deposit sent</span>
        }

        if (awaitingDepositSignature) {
            return <span>Awaiting signature...</span>
        }

        if (awaitingDepositConfirmation) {
            return <span>Depositing...</span>
        }

        return <span>Deposit</span>
    }

    if (needsSimulation || isSimulating || needsResimulation) {
        return (
            <TransactionButton
                onClick={() => {
                    setToSimulate(true)

                    if (isSimulateStale) {
                        refetchSimulation()
                    }
                }}
                pattern
                isLoading={isSimulating || isSimulateFetching}
                isErrored={simulationFailed}
                isConfirmed={simulationSuccess && !isSimulateStale}
                isReload={simulationFailed}
                disabled={isSimulating || isSimulateFetching || needsInput}
            >
                <ButtonChild />
            </TransactionButton>
        )
    }

    return (
        <TransactionButton
            onClick={() => {
                setToDeposit(true)
                writeContract({
                    abi: dfmmABI,
                    address: dfmmAddress,
                    functionName: 'allocate',
                    args: [poolId, payload],
                })
            }}
            pattern
            isAwaitingWalletConfirmation={isPending}
            isErrored={isError}
            isConfirmed={
                isSuccess &&
                typeof txHash !== 'undefined' &&
                typeof txReceipt !== 'undefined'
            }
            isReload={isError}
            isBroadcasting={
                typeof txHash !== 'undefined' && awaitingDepositConfirmation
            }
            disabled={needsInput}
        >
            <ButtonChild />
        </TransactionButton>
    )
}

export default AllocateTransaction
