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
    const [strategy, setStrategy] = useState(strats[0].value)
    const [controller, setController] = useState<string>('')
    const [feeRate, setFeeRate] = useState(feeLevels[0].value)
    const [weights, setWeights] = useState<
        { weight: string; isLocked: boolean }[]
    >([])
    const [poolTokens, setPoolTokens] = useState<`0x${string}`[]>(
        setDefaultTokens(strategy)
    )

    const [tokensBalance, setTokensBalance] = useState<number[]>([0, 0])

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
        console.log(_weights)
        setWeights(_weights)
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
                setTokensBalance(_balances)
            }
            calculateWeights()
        })()
    }, [address, poolTokens])

    if (weights.length < 1 || poolTokens.length < 1) return <></>
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
                                    <TableCell></TableCell>
                                    <TableCell>
                                        {' '}
                                        <Input
                                            type="text"
                                            disabled={
                                                strategy !== 'GeometricMean' ||
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
                                    <TableCell>
                                        <Button
                                            onClick={() => lockWeight(token)}
                                        >
                                            {weights[i].isLocked
                                                ? 'Unlock'
                                                : 'Lock'}{' '}
                                            Weight
                                        </Button>
                                        {i < 2 ? (
                                            <h2>Token {i + 1}</h2>
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
