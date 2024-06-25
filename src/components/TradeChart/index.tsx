import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useAccount } from 'wagmi'
import {
    Chart,
    LineSeries,
    HistogramSeries,
    CandlestickSeries,
    PriceScale,
    TimeScale,
    PriceLine,
} from 'lightweight-charts-react-wrapper'

import { useGraphQL } from '../../useGraphQL'
import {
    MarketPriceQueryDocument,
    MarketPriceFragment,
    ImpliedYieldFragment,
    ImplYieldQueryDocument,
    UnderlyingYieldQueryDocument,
} from '../../queries/prices'

import {
    PositionQueryDocument,
    YieldPositionsQueryDocument,
} from '../../queries/positions'

export type TradeChartProps = {
    marketId: string
    isLong: boolean
}
export type PositionLineProps = {
    marketId: string
    address: string
}

type HourlyPrice = {
    time: string
    open: number
    high: number
    low: number
    close: number
}

type HourlyVolume = {
    time: string
    value: number
}

type HourlyAverage = {
    time: string
    value: number
}

const normalizePrice = (
    rawHourly: (typeof MarketPriceFragment)[],
    isLong: boolean
): HourlyPrice[] => {
    const parsed = rawHourly.map((tck) => {
        return {
            time: tck.id,
            open: isLong ? tck.open : 1 - tck.open,
            high: isLong ? tck.high : 1 - tck.high,
            low: isLong ? tck.high : 1 - tck.low,
            close: isLong ? tck.close : 1 - tck.close,
        }
    })
    return parsed
}

const normalizeVolume = (
    rawHourly: (typeof MarketPriceFragment)[],
    isLong: boolean
): HourlyVolume[] => {
    const parsed = rawHourly.map((tck, i) => {
        const isGreenLong =
            !rawHourly[i - 1] || tck.open > rawHourly[i - 1].close
        const isGreen = isLong ? isGreenLong : !isGreenLong
        return {
            time: tck.id,
            value: tck.volume,
            color: isGreen ? 'rgba(0, 150, 136, 0.8)' : 'rgba(255,82,82, 0.8)',
        }
    })
    return parsed
}

const normalizeAverage = (
    rawHourly: (typeof MarketPriceFragment)[],
    isLong: boolean
): HourlyAverage[] => {
    const parsed = rawHourly.map((tck) => {
        return {
            time: tck.id,
            value: isLong ? tck.average : 1 - tck.average,
        }
    })
    return parsed
}

const normalizeYield = (
    rawTimeSeries: (typeof ImpliedYieldFragment)[]
): { time: string; value: number }[] => {
    const parsed = rawTimeSeries.map((tck) => {
        return {
            time: tck.time,
            value: tck.value * 100,
        }
    })
    return parsed
}

const PositionLine: FC<PositionLineProps> = ({ marketId, address }) => {
    const position = useGraphQL(YieldPositionsQueryDocument, {
        marketId,
        portfolioId: address,
    })
    const [positionEntry, setPositionEntry] = useState<number | null>(null)
    const [positionSize, setPositionSize] = useState<number | null>(null)

    useEffect(() => {
        if (
            position.status === 'success' &&
            !!position.data?.positions?.items
        ) {
            position.data.positions.items.map((pos) => {
                if (pos.portfolioId === address.toLowerCase()) {
                    const value = pos.avgEntryImpliedRate * 100
                    const size = pos.netYieldDelta
                    setPositionEntry(value)
                    setPositionSize(size)
                }
            })
        }
    }, [position.status])
    if (!positionEntry || !positionSize) return <></>
    return (
        <PriceLine
            price={positionEntry}
            lineWidth={3}
            color="green"
            axisLabelVisible={true}
            title={`${positionSize.toFixed(4)} stETH @ `}
        />
    )
}

const TradeChart: FC<TradeChartProps> = ({ marketId, isLong = false }) => {
    const { data, status } = useGraphQL(MarketPriceQueryDocument, { marketId })
    const implied = useGraphQL(ImplYieldQueryDocument, { marketId })
    const underlying = useGraphQL(UnderlyingYieldQueryDocument, { marketId })
    const account = useAccount()

    const [yData, setYData] = useState<
        { time: string; value: number }[] | null | any
    >(null)
    const [uData, setUData] = useState<
        { time: string; value: number }[] | null | any
    >(null)

    const [cData, setCData] = useState<HourlyPrice[] | null | any>(null)
    const [vData, setVData] = useState<HourlyVolume[] | null | any>(null)
    const [aData, setAData] = useState<HourlyAverage[] | null | any>(null)

    const yOptions = {
        container: {
            style: {
                width: '100%',
                height: '100%',
            },
        },
        watermark: {
            visible: true,
            text: 'wstETH APY',
            fontSize: 30,
            color: 'gray',
            horzAlign: 'left',
            vertAlign: 'bottom',
        },
        grid: {
            vertLines: {
                color: 'rgba(42, 46, 57, 0.5)',
            },
            horzLines: {
                color: 'rgba(42, 46, 57, 1)',
            },
        },
        rightPriceScale: {
            scaleMargins: {
                top: 0.2,
                bottom: 0.2,
            },
            borderVisible: false,
        },
        layout: {
            background: {
                type: 'gradient',
                topColor: 'black',
                bottomColor: 'black',
            },
            textColor: '#d1d4dc',
        },
    }
    const pOptions = {
        container: {
            style: {
                width: '100%',
                height: '100%',
            },
        },
        watermark: {
            visible: true,
            text: isLong ? 'YT / stETH' : 'PT / stETH',
            fontSize: 30,
            color: 'gray',
            horzAlign: 'left',
            vertAlign: 'bottom',
        },
        grid: {
            vertLines: {
                color: 'rgba(42, 46, 57, 0.5)',
            },
            horzLines: {
                color: 'rgba(42, 46, 57, 1)',
            },
        },
        rightPriceScale: {
            scaleMargins: {
                top: 0.2,
                bottom: 0.3,
            },
            borderVisible: false,
        },
        layout: {
            background: {
                type: 'gradient',
                topColor: 'black',
                bottomColor: 'black',
            },
            textColor: '#d1d4dc',
        },
    }
    useEffect(() => {
        if (status === 'success') {
            const priceData = normalizePrice(
                data.yieldPricesHourlys.items,
                isLong
            )
            const volData = normalizeVolume(
                data.yieldPricesHourlys.items,
                isLong
            )
            const avgData = normalizeAverage(
                data.yieldPricesHourlys.items,
                isLong
            )
            setCData(priceData)
            setVData(volData)
            setAData(avgData)
        }
    }, [status])

    useEffect(() => {
        if (implied.status === 'success' && underlying.status === 'success') {
            const yieldData = normalizeYield(implied.data.impliedYields.items)
            const underlyingData = normalizeYield(
                underlying.data.underlyingYields.items
            )
            setYData(yieldData)
            setUData(underlyingData)
        }
    }, [implied.status, underlying.status])

    if (!cData || !yData) return <></>
    return (
        <div className="grid grid-cols-2 h-full w-full divide-x">
            <Chart {...yOptions} autoSize>
                <LineSeries
                    data={yData}
                    color="rgba(33, 150, 243, 1)"
                    lineWidth={2}
                    title="Implied Rate"
                    priceFormat={{ type: 'percent' }}
                >
                    {!!account?.address ? (
                        <PositionLine
                            marketId={marketId}
                            address={account.address}
                        />
                    ) : (
                        <></>
                    )}
                </LineSeries>
                <LineSeries
                    data={uData}
                    color="green"
                    lineWidth={2}
                    title="Underlying Rate"
                    priceFormat={{ type: 'percent' }}
                />
                <TimeScale
                    secondsVisible={true}
                    timeVisible={true}
                    barSpacing={20}
                    rightOffset={10}
                />
            </Chart>
            <Chart {...pOptions} autoSize>
                <CandlestickSeries
                    data={cData}
                    title={isLong ? 'YT / stETH' : 'PT / stETH'}
                />
                <HistogramSeries
                    data={vData}
                    priceFormat={{ type: 'volume' }}
                    priceScaleId="overlay"
                    title="Volume (stETH)"
                />
                <PriceScale
                    id="overlay"
                    scaleMargins={{ top: 0.8, bottom: 0 }}
                />
                <TimeScale
                    secondsVisible={true}
                    timeVisible={true}
                    barSpacing={20}
                    rightOffset={10}
                />
                <LineSeries data={aData} color="#d1d4dc" lineWidth={2} />
            </Chart>
        </div>
    )
}

export default TradeChart
