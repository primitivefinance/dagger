import { useEffect, useState, useRef, createContext, useContext } from 'react'
import type { FC } from 'react'
import { useAccount, useChainId } from 'wagmi'
import CardToggleGroup from '@/components/CardRadioGroup'

import { balanceOf } from '@/lib/erc20'
import TokenSelector from '@/components/TokenSelector'
import { tokens } from '@/data/tokens'
import { title, subtitle, tags, feeLevels } from '@/data/copy/create-pool'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import {
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableHeader,
} from '@/components/ui/table'

export type CSParams = {
    controller: string
    fee: string
    price: string
}

export type NG3MParams = {
    controller: string
    fee: string
    weights: string[]
}

export type LNParams = {
    controller: string
    fee: string
    mean: string
    width: string
}

export type CreatePoolParams = {
    tokens: `0x${string}`[]
    amounts: string[]
    strategy: string
    params: CSParams | NG3MParams | LNParams | null
}

const initalParams: CreatePoolParams = {
    tokens: [],
    amounts: [],
    strategy: 'GeometricMean',
    params: null,
}
// Import this context to use generated parameters in children
export const CreatePoolContext = createContext<CreatePoolParams>(initalParams)

export type CreatePoolFormProps = {
    children?: React.ReactNode
    strategy: string
}

const CreatePoolForm: FC<CreatePoolFormProps> = ({
    children,
    strategy = 'GeometricMean',
}) => {
    const { address } = useAccount()
    const chainId = useChainId()

    const setDefaultTokens: (strat: string) => `0x${string}`[] = (
        strat: string
    ) => {
        switch (strat) {
            case 'GeometricMean':
                return [
                    tokens[chainId][0].address,
                    tokens[chainId][1].address,
                    tokens[chainId][2].address,
                    tokens[chainId][3].address,
                ] as `0x${string}`[]
            case 'LogNormal':
                return [
                    tokens[chainId][0].address,
                    tokens[chainId][1].address,
                ] as `0x${string}`[]
            case 'ConstantSum':
                return [
                    tokens[chainId][0].address,
                    tokens[chainId][1].address,
                ] as `0x${string}`[]
            default:
                return [
                    tokens[chainId][0].address,
                    tokens[chainId][1].address,
                ] as `0x${string}`[]
        }
    }
    const [controller, setController] = useState<string>('')
    const [feeRate, setFeeRate] = useState(feeLevels[0].value)
    // G3M Params
    const [weights, setWeights] = useState<
        { weight: string; isLocked: boolean }[]
    >([])
    // LN Params
    const [mean, setMean] = useState<string>('')
    const [width, setWidth] = useState<string>('')
    // CS Params
    const [price, setPrice] = useState<string>('1')

    const [poolTokens, setPoolTokens] = useState<`0x${string}`[]>(
        setDefaultTokens(strategy)
    )
    const [balances, setTokenBalances] = useState<number[]>([0, 0, 0, 0])
    const [amounts, setAmounts] = useState<string[]>(['', '', '', ''])

    // Consolidated parameter object
    const [params, setParams] = useState<
        CSParams | NG3MParams | LNParams | null
    >(null)

    const lockWeight = (tokenAddress: `0x${string}`) => {
        const _weights: { weight: string; isLocked: boolean }[] = []
        poolTokens.map((tkn, i) => {
            tkn === tokenAddress
                ? _weights.push({
                      weight: weights[i].weight,
                      isLocked: !weights[i].isLocked,
                  })
                : _weights.push(weights[i])
        })
        setWeights(_weights)
    }

    const calculateWeights = (
        inputWeightToken?: `0x${string}`,
        inputWeight?: string
    ) => {
        const _weights: { weight: string; isLocked: boolean }[] = []
        let lockedWeights: number = 0
        let numLocked: number = 0
        if (!inputWeight || !inputWeightToken) {
            poolTokens.map((tkn, i) => {
                _weights.push({
                    weight: (
                        100 / parseFloat(poolTokens.length.toString())
                    ).toString(),
                    isLocked: weights[i]?.weight ? weights[i].isLocked : false,
                })
            })
        } else {
            weights.map((w) => {
                if (w.isLocked) {
                    numLocked++
                    lockedWeights += Number(w.weight)
                }
            })
            lockedWeights += parseFloat(inputWeight)
            poolTokens.map((tkn, i) => {
                if (inputWeightToken && tkn === inputWeightToken) {
                    _weights.push({ weight: inputWeight, isLocked: false })
                } else {
                    _weights.push({
                        weight: weights[i].isLocked
                            ? weights[i].weight
                            : (
                                  (100 - lockedWeights) /
                                  (poolTokens.length - 1 - numLocked)
                              ).toString(),
                        isLocked: weights[i].isLocked,
                    })
                }
            })
        }
        setWeights(_weights)
    }

    const calculateAmounts = (
        inputAmountToken: `0x${string}`,
        inputAmount: string
    ) => {
        let _amounts: string[] = []
        switch (strategy) {
            case 'GeometricMean':
                poolTokens.map((tkn, i) => {
                    tkn === inputAmountToken
                        ? _amounts.push(
                              !parseFloat(inputAmount) ? '' : inputAmount
                          )
                        : _amounts.push(
                              (
                                  parseFloat(inputAmount) *
                                  (parseFloat(weights[i].weight) / 100) *
                                  weights.length
                              ).toString()
                          )
                })
                break
            case 'LogNormal':
                // TODO: add LN pricing logic, maybe reformat input to be one sided?
                _amounts[0] === inputAmount
                _amounts[1] === inputAmount
                break
            case 'ConstantSum':
                const temp_1 = (
                    parseFloat(!parseFloat(inputAmount) ? '' : inputAmount) *
                    parseFloat(price)
                ).toString()
                const temp_2 = (
                    parseFloat(!parseFloat(inputAmount) ? '' : inputAmount) *
                    (1 - parseFloat(price))
                ).toString()
                _amounts =
                    poolTokens[0] === inputAmountToken
                        ? [inputAmount, temp_2]
                        : [temp_1, inputAmount]
                break
            default:
                break
        }
        setAmounts(_amounts)
    }

    const addToken = (tokenAddress: `0x${string}`) => {
        setPoolTokens([...poolTokens, tokenAddress])
    }

    const removeToken = (tokenAddress: `0x${string}`) => {
        const _poolTokens = poolTokens.filter((tkn) => tkn !== tokenAddress)
        setPoolTokens(_poolTokens)
    }

    const setToken = (tokenAddress: `0x${string}`, position: number) => {
        const _poolTokens = poolTokens.map((token, i) =>
            i === position ? tokenAddress : token
        )
        setPoolTokens(_poolTokens)
    }

    useEffect(() => {
        ;(async () => {
            if (address) {
                const _balances: number[] = []
                for (const _token of poolTokens) {
                    const balance = await balanceOf(_token, address)
                    _balances.push(balance)
                }
                setTokenBalances(_balances)
            }
            calculateWeights()
        })()
    }, [address, poolTokens])

    useEffect(() => {
        setPoolTokens(setDefaultTokens(strategy))
    }, [strategy])

    useEffect(() => {
        switch (strategy) {
            case 'GeometricMean':
                setParams({
                    controller,
                    fee: feeRate,
                    weights: weights.map((w) => w.weight),
                })
                break
            case 'LogNormal':
                setParams({
                    controller,
                    fee: feeRate,
                    price,
                })
                break
            case 'ConstantSum':
                setParams({
                    controller,
                    fee: feeRate,
                    mean,
                    width,
                })
                break
            default:
                break
        }
    }, [
        amounts,
        poolTokens,
        controller,
        feeRate,
        weights,
        mean,
        width,
        price,
        strategy,
    ])

    if (poolTokens.length < 1 || weights.length < 1) return <></>
    return (
        <>
            <div className="grid w-1/2 items-center gap-1">
                <Label className="text-sm font-semibold">
                    {tags['controller'].title}
                </Label>
                <Input
                    value={controller}
                    onChange={(e) => setController(e.target.value)}
                    placeholder="Use an Ethereum address or an ENS name..."
                />
                <div className="w-full flex justify-end -my-2">
                    <Button
                        variant="link"
                        className="p-0"
                        onClick={() =>
                            setController(address !== undefined ? address : '')
                        }
                    >
                        Use my current wallet address
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-x-14 gap-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{tags['fee'].title}</CardTitle>
                        <CardDescription>{tags['fee'].sub}</CardDescription>
                    </CardHeader>
                </Card>
                <CardToggleGroup
                    options={feeLevels}
                    value={feeRate}
                    setValue={setFeeRate}
                />
                {strategy === 'LogNormal' ? (
                    <>
                        <Card>
                            <CardHeader>
                                <CardTitle>{tags['mean'].title}</CardTitle>
                                <CardDescription>
                                    {tags['mean'].sub}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    type="text"
                                    placeholder="0.0"
                                    value={mean}
                                    onChange={(e) => {
                                        setMean(e.target.value)
                                    }}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{tags['width'].title}</CardTitle>
                                <CardDescription>
                                    {tags['width'].sub}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Input
                                    type="text"
                                    placeholder="0.0"
                                    value={width}
                                    onChange={(e) => {
                                        setWidth(e.target.value)
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </>
                ) : (
                    <></>
                )}
                {strategy === 'ConstantSum' ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>{tags['price'].title}</CardTitle>
                            <CardDescription>
                                {tags['price'].sub}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Input
                                type="text"
                                placeholder="0.0"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value)
                                }}
                            />
                            <p>
                                {tokens[chainId].find(
                                    (tkn) => tkn.address === poolTokens[0]
                                )?.symbol || ''}{' '}
                                /{' '}
                                {tokens[chainId].find(
                                    (tkn) => tkn.address === poolTokens[1]
                                )?.symbol || ''}
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <></>
                )}
            </div>
            <div className="flex flex-row gap-4 items-center">
                <Table>
                    <TableHeader>
                        <TableCell>Tokens</TableCell>
                        <TableCell>Amounts</TableCell>
                        {strategy === 'GeometricMean' ? (
                            <>
                                <TableCell>Weights</TableCell>
                                <TableCell>Edit</TableCell>
                            </>
                        ) : (
                            <></>
                        )}
                    </TableHeader>
                    <TableBody>
                        {poolTokens.map((token, i) => {
                            const _setToken = (tkn: `0x${string}`) => {
                                setToken(tkn, i)
                            }
                            if (weights.length != poolTokens.length)
                                return (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <TokenSelector
                                                tokenLogo={
                                                    tokens[chainId].find(
                                                        (tkn) =>
                                                            tkn.address ===
                                                            token
                                                    )?.logo || ''
                                                }
                                                tokenSymbol={
                                                    tokens[chainId].find(
                                                        (tkn) =>
                                                            tkn.address ===
                                                            token
                                                    )?.symbol || ''
                                                }
                                                setToken={_setToken}
                                                disabledTokens={poolTokens}
                                            />
                                        </TableCell>
                                        <TableCell>...</TableCell>
                                        <TableCell>...</TableCell>
                                        <TableCell>...</TableCell>
                                    </TableRow>
                                ) //let async catch up
                            return (
                                <TableRow key={i}>
                                    <TableCell>
                                        <TokenSelector
                                            tokenLogo={
                                                tokens[chainId].find(
                                                    (tkn) =>
                                                        tkn.address === token
                                                )?.logo || ''
                                            }
                                            tokenSymbol={
                                                tokens[chainId].find(
                                                    (tkn) =>
                                                        tkn.address === token
                                                )?.symbol || ''
                                            }
                                            setToken={_setToken}
                                            disabledTokens={poolTokens}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input
                                            className={
                                                !parseFloat(amounts[i]) &&
                                                amounts[i] !== ''
                                                    ? 'border-red-500'
                                                    : ''
                                            }
                                            type="text"
                                            placeholder="0.0"
                                            value={amounts[i]}
                                            onChange={(e) => {
                                                calculateAmounts(
                                                    token,
                                                    e.target.value
                                                )
                                            }}
                                        />
                                        <span>
                                            {'Balance: ' + balances[i]}{' '}
                                            {
                                                tokens[chainId].find(
                                                    (tkn) =>
                                                        tkn.address === token
                                                )?.symbol
                                            }
                                        </span>
                                    </TableCell>
                                    {strategy === 'GeometricMean' ? (
                                        <TableCell>
                                            <Input
                                                type="text"
                                                disabled={
                                                    strategy !==
                                                        'GeometricMean' ||
                                                    weights[i].isLocked
                                                }
                                                value={weights[i].weight}
                                                onChange={(e) => {
                                                    calculateWeights(
                                                        token,
                                                        e.target.value
                                                    )
                                                }}
                                            />
                                        </TableCell>
                                    ) : (
                                        <></>
                                    )}

                                    {strategy === 'GeometricMean' ? (
                                        <TableCell>
                                            <Button
                                                onClick={() =>
                                                    lockWeight(token)
                                                }
                                            >
                                                {weights[i].isLocked
                                                    ? 'Unlock'
                                                    : 'Lock'}{' '}
                                                Weight
                                            </Button>
                                            {i < 2 ? (
                                                <></>
                                            ) : (
                                                <Button
                                                    onClick={() =>
                                                        removeToken(token)
                                                    }
                                                >
                                                    Remove Token {i + 1}
                                                </Button>
                                            )}
                                        </TableCell>
                                    ) : (
                                        <></>
                                    )}
                                </TableRow>
                            )
                        })}
                        {strategy === 'GeometricMean' ? (
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    {tokens[chainId].find(
                                        (tkn) =>
                                            !poolTokens.includes(tkn.address)
                                    )?.address === undefined ? (
                                        <h2>No More Tokens!</h2>
                                    ) : (
                                        <Button
                                            onClick={() =>
                                                addToken(
                                                    tokens[chainId].find(
                                                        (tkn) =>
                                                            !poolTokens.includes(
                                                                tkn.address
                                                            )
                                                    )?.address as `0x${string}`
                                                )
                                            }
                                        >
                                            Add Token
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ) : (
                            <></>
                        )}
                    </TableBody>
                </Table>
            </div>
            <CreatePoolContext.Provider
                value={{ tokens: poolTokens, amounts, strategy, params }}
            >
                {children}
            </CreatePoolContext.Provider>
        </>
    )
}

export default CreatePoolForm
