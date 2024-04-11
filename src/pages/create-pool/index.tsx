import { useEffect, useState } from 'react'
import { useAccount, useConnect, useChainId } from 'wagmi'
import { NumberToHexOpts, parseEther, parseUnits } from 'viem'
import CardToggleGroup from '@/components/CardRadioGroup'

import { balanceOf, allowance, approve } from '@/lib/erc20'
import TokenAmountInput from '@/components/TokenAmountInput'
import { computeAndFormatPrice, computePrice } from '@/lib/g3m'
import TokenSelector from '@/components/TokenSelector'
import { LogNormal, init, G3M, DFMM } from '@/lib/dfmm'
import { tokens } from '@/data/tokens'
import {
    title,
    subtitle,
    tags,
    strats,
    feeLevels,
    weights,
} from '@/data/copy/create-pool'
import { usePrices } from '@/store/PricesContext'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
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

function CreatePool() {
    const { address } = useAccount()
    const { connectors, connect } = useConnect()
    const chainId = useChainId()

    const [strategy, setStrategy] = useState(strats[0].value)
    const [feeRate, setFeeRate] = useState(feeLevels[0].value)
    const [weights, setWeights] = useState<string[]>([])

    const [poolTokens, setPoolTokens] = useState<`0x${string}`[]>([
        tokens[chainId][0].address,
        tokens[chainId][1].address,
    ])

    const [controller, setController] = useState<string>('')
    const [reserves, setReserves] = useState<string[]>(['', ''])
    const [tokensBalance, setTokensBalance] = useState<number[]>([0, 0])

    const addToken = (tokenAddress: `0x${string}`) => {
        setPoolTokens([...poolTokens, tokenAddress])
    }

    const removeToken = (tokenAddress: `0x${string}`) => {
        const _poolTokens = poolTokens.filter((tkn) => tkn !== tokenAddress)
        setPoolTokens(_poolTokens)
    }

    const calculateWeights = (
        inputWeightToken?: `0x${string}`,
        inputWeight?: string
    ) => {
        const _weights: string[] = []
        if (!inputWeight || !inputWeightToken) {
            poolTokens.map(() => {
                _weights.push(
                    (100 / parseFloat(poolTokens.length.toString())).toString()
                )
            })
        } else {
            poolTokens.map((tkn) => {
                if (tkn === inputWeightToken) {
                    _weights.push(inputWeight)
                } else {
                    _weights.push(
                        (
                            (100 - parseFloat(inputWeight)) /
                            poolTokens.length
                        ).toString()
                    )
                }
            })
        }
        console.log(_weights)
        setWeights(_weights)
    }

    const setToken = (tokenAddress: `0x${string}`, position: number) => {
        const _poolTokens = poolTokens.map((token, i) =>
            i === position ? tokenAddress : token
        )
        setPoolTokens(_poolTokens)
    }

    const setDefaults = (strat: string) => {
        switch (strat) {
            case 'GeometricMean':
                setPoolTokens([
                    tokens[chainId][0].address,
                    tokens[chainId][1].address,
                    tokens[chainId][2].address,
                    tokens[chainId][3].address,
                ] as `0x${string}`[])
                break
            case 'LogNormal':
                break
            case 'ConstantSum':
                break
            default:
                break
        }
    }

    useEffect(() => {
        ;(async () => {
            if (address) {
                const _balances: number[] = []
                for (const _token of poolTokens) {
                    const balance = await balanceOf(_token, address)
                    _balances.push(balance)
                }
                setTokensBalance(_balances)
            }
        })()
    }, [address, poolTokens])

    useEffect(() => {
        setDefaults(strategy)
    }, [strategy])

    useEffect(() => {
        calculateWeights()
    }, [poolTokens])

    return (
        <div className="py-16 container mx-auto max-w-6xl gap-14 flex flex-col">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-semibold">{title}</h2>
                <h4 className="leading-tight text-xl">{subtitle}</h4>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-x-14 gap-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{tags['strategy'].title}</CardTitle>
                        <CardDescription>
                            {tags['strategy'].sub}
                        </CardDescription>
                    </CardHeader>
                </Card>
                <CardToggleGroup
                    options={strats}
                    value={strategy}
                    setValue={setStrategy}
                />
            </div>
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
                <Card>
                    <CardHeader>
                        <CardTitle>{tags['mean'].title}</CardTitle>
                        <CardDescription>{tags['mean'].sub}</CardDescription>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{tags['width'].title}</CardTitle>
                        <CardDescription>{tags['width'].sub}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <Table>
                    <TableHeader>
                        <TableCell>Tokens</TableCell>
                        <TableCell>Amounts</TableCell>
                        <TableCell>Weights</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableHeader>
                    <TableBody>
                        {poolTokens.map((token, i) => {
                            const _setToken = (tkn: `0x${string}`) => {
                                setToken(tkn, i)
                            }
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
                                    <TableCell></TableCell>
                                    <TableCell>
                                        {' '}
                                        <Input
                                            type="text"
                                            disabled={
                                                strategy !== 'GeometricMean'
                                            }
                                            value={weights[i]}
                                            onChange={(e) => {
                                                calculateWeights(
                                                    token,
                                                    e.target.value
                                                )
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {i < 2 ? (
                                            <Button disabled>
                                                Token {i + 1}
                                            </Button>
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
                                </TableRow>
                            )
                        })}
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                                {tokens[chainId].find(
                                    (tkn) => !poolTokens.includes(tkn.address)
                                )?.address === undefined ? (
                                    <Card>No More Tokens!</Card>
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
                    </TableBody>
                </Table>

                {/***
                 * 


                <div className="flex flex-col gap-4 items-start">
                    <TokenAmountInput
                        tokenAddress={
                            tokens.find((token) => token.address === tokenX)!
                                .address
                        }
                        tokenSymbol={
                            tokens.find((token) => token.address === tokenX)!
                                .symbol
                        }
                        tokenBalance={tokenXBalance}
                        amount={reserveX}
                        setAmount={setReserveX}
                        tokenPrice={
                            prices[
                                tokens.find(
                                    (token) => token.address === tokenX
                                )!.symbol
                            ]
                        }
                        tokenLogo={
                            tokens.find((token) => token.address === tokenX)!
                                .logo
                        }
                    />

                    <TokenAmountInput
                        tokenAddress={
                            tokens.find((token) => token.address === tokenY)!
                                .address
                        }
                        tokenSymbol={
                            tokens.find((token) => token.address === tokenY)!
                                .symbol
                        }
                        tokenBalance={tokenYBalance}
                        amount={reserveY}
                        setAmount={setReserveY}
                        tokenPrice={
                            prices[
                                tokens.find(
                                    (token) => token.address === tokenX
                                )!.symbol
                            ]
                        }
                        tokenLogo={
                            tokens.find((token) => token.address === tokenY)!
                                .logo
                        }
                    />

                    <div className="flex flex-col justify-end text-right w-full px-3">
                        <p className="text-sm">
                            Price based on the given pool parameters:
                        </p>

                        <p className="text-base font-bold">
                            {computeAndFormatPrice(
                                parseFloat(reserveX),
                                parseFloat(reserveY),
                                Number(weight) / 100,
                                (100 - Number(weight)) / 100
                            )}{' '}
                            {_tokenY.symbol}{' '}
                            <span className="text-xs font-normal">
                                per {_tokenX.symbol},{' '}
                            </span>{' '}
                            {computeAndFormatPrice(
                                parseFloat(reserveY),
                                parseFloat(reserveX),
                                (100 - Number(weight)) / 100,
                                Number(weight) / 100
                            )}{' '}
                            {_tokenX.symbol}{' '}
                            <span className="text-xs font-normal">
                                per {_tokenY.symbol}.
                            </span>
                        </p>
                    </div>
                </div>
                */}
            </div>
            {/**
             * 
<Button
                variant="default"
                onClick={async () => {
                    if (address === undefined) {
                        connect({ connector: connectors[0] })
                    } else {
                        const allowanceX = await allowance(
                            tokenX,
                            address,
                            DFMM
                        )

                        if (allowanceX === 0) {
                            await approve(tokenX, DFMM)
                        }

                        const allowanceY = await allowance(
                            tokenY,
                            address,
                            DFMM
                        )

                        if (allowanceY === 0) {
                            await approve(tokenY, DFMM)
                        }

                        const result = await init(
                            strategy === 'G3M' ? G3M : LogNormal,
                            tokenX,
                            tokenY,
                            parseUnits(reserveX, _tokenX.decimals),
                            parseEther(
                                computePrice(
                                    parseFloat(reserveX),
                                    parseFloat(reserveY),
                                    Number(weight) / 100,
                                    (100 - Number(weight)) / 100
                                ).toString()
                            ),
                            parseEther((Number(weight) / 100).toString()),
                            parseEther((Number(feeRate) / 100).toString()),
                            controller as `0x${string}`
                        )

                        console.log(result)
                    }
                }}
            >
                {address === undefined ? 'Connect Wallet' : 'Create Pool'}
            </Button>

             */}
        </div>
    )
}

export default CreatePool
