import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import {
    Chart,
    LineSeries,
    HistogramSeries,
    PriceScale,
    TimeScale,
} from 'lightweight-charts-react-wrapper'

import { useGraphQL } from '../../useGraphQL'
import {
    MarketPriceQueryDocument,
    MarketPriceFragment,
    ImpliedYieldFragment,
    ImplYieldQueryDocument,
    UnderlyingYieldQueryDocument,
} from '../../queries/prices'

export type TradeChartProps = {
    marketId: string
    isLong: boolean
}
export type PositionLineProps = {
    marketId: string
    address: string
}

type Volume = {
    time: string
    value: number
    color?: string
}

type Price = {
    time: string
    value: number
}

const normalizePrice = (
    rawHourly: (typeof MarketPriceFragment)[],
    isLong: boolean
): Price[] => {
    const parsed = rawHourly.map((tck) => {
        return {
            time: tck.time,
            value: tck.value,
        }
    })
    return parsed
}

const normalizeVolume = (
    rawHourly: (typeof MarketPriceFragment)[],
    isLong: boolean
): Volume[] => {
    const parsed = rawHourly.map((tck, i) => {
        const isGreenLong =
            !rawHourly[i - 1] || tck.open > rawHourly[i - 1].close
        const isGreen = isLong ? isGreenLong : !isGreenLong
        return {
            time: tck.time,
            value: tck.volume,
            color: isGreen ? 'rgba(0, 150, 136, 0.8)' : 'rgba(255,82,82, 0.8)',
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

const TradeChart: FC<TradeChartProps> = ({ marketId, isLong = false }) => {
    const { data, status } = useGraphQL(MarketPriceQueryDocument, { marketId })
    const implied = useGraphQL(ImplYieldQueryDocument, { marketId })
    const underlying = useGraphQL(UnderlyingYieldQueryDocument, { marketId })

    const [yData, setYData] = useState<
        { time: string; value: number }[] | null | any
    >(null)
    const [uData, setUData] = useState<
        { time: string; value: number }[] | null | any
    >(null)

    const [pData, setPData] = useState<Price[] | null | any>(null)
    const [vData, setVData] = useState<Volume[] | null | any>(null)

    const yOptions = {
        container: {
            style: {
                width: '50%',
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
                width: '50%',
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
            const priceData = normalizePrice(data.principalPrices.items, isLong)
            const volData = normalizeVolume(data.principalPrices.items, isLong)
            setVData(volData)
            console.log(volData)
            setPData(priceData)
            console.log(priceData)
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

    if (!uData || !yData || !vData || !pData) return <></>
    return (
        <div className="flex flex-row h-full w-full">
            <Chart {...yOptions} autoSize>
                <LineSeries
                    data={yData}
                    color="rgba(33, 150, 243, 1)"
                    lineWidth={3}
                    title="Market APR"
                    priceFormat={{
                        type: 'custom',
                        minMove: 0.0001,
                        formatter: (price) => price.toFixed(3) + '%',
                    }}
                ></LineSeries>
                <LineSeries
                    data={uData}
                    color="green"
                    lineWidth={3}
                    title="Underlying APR"
                    priceFormat={{
                        type: 'price',
                        precision: 6,
                        minMove: 0.000001,
                    }}
                />

                <TimeScale
                    secondsVisible={true}
                    timeVisible={true}
                    barSpacing={20}
                    rightOffset={15}
                />
            </Chart>
            <Chart {...pOptions} autoSize>
                <LineSeries
                    data={pData}
                    color="rgba(33, 150, 243, 1)"
                    lineWidth={3}
                    title="PT / stETH"
                    priceFormat={{
                        type: 'custom',
                        minMove: 0.0001,
                        formatter: (price) => price.toFixed(4),
                    }}
                ></LineSeries>
                <HistogramSeries
                    data={vData}
                    priceFormat={{ type: 'volume', precision: 1 }}
                    priceScaleId="side_overlay"
                    title="Volume (stETH)"
                />
                <PriceScale
                    id="side_overlay"
                    scaleMargins={{ top: 0.8, bottom: 0 }}
                />
                <TimeScale
                    secondsVisible={true}
                    timeVisible={true}
                    barSpacing={20}
                    rightOffset={15}
                />
            </Chart>
        </div>
    )
}

export default TradeChart
