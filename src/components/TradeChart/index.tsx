import type { FC } from 'react'
import { useEffect, useRef } from 'react'

import { createChart, CrosshairMode, ColorType } from 'lightweight-charts'
import { useGraphQL } from '../../useGraphQL'
import {
    MarketPriceQueryDocument,
    MarketPriceFragment,
    ImpliedYieldFragment,
    ImplYieldQueryDocument,
} from '../../queries/prices'

export type TradeChartProps = {
    marketId: string
    isLong: boolean
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
            time: tck.id,
            value: tck.value,
        }
    })
    return parsed
}

const TradeChart: FC<TradeChartProps> = ({ marketId, isLong = false }) => {
    const chartContainerRef = useRef()
    const yieldChartContainerRef = useRef()
    // convert query to where: marketId
    const { data, status } = useGraphQL(MarketPriceQueryDocument, { marketId })
    const resp = useGraphQL(ImplYieldQueryDocument, { marketId })
    useEffect(() => {
        if (status === 'success' && data) {
            const priceData = normalizePrice(
                data.marketPricesHourlys.items,
                isLong
            )
            const volData = normalizeVolume(
                data.marketPricesHourlys.items,
                isLong
            )
            const avgData = normalizeAverage(
                data.marketPricesHourlys.items,
                isLong
            )

            const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef?.current
                    ? 0
                    : chartContainerRef.current.clientWidth,
                height: chartContainerRef.current.clientHeight,
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
                        top: 0.3,
                        bottom: 0.5,
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
            })
            const handleResize = () => {
                chart.applyOptions({
                    width: chartContainerRef.current.clientWidth
                        ? 0
                        : chartContainerRef.current.clientWidth,
                })
            }
            const priceSeries = chart.addCandlestickSeries({
                upColor: '#26a69a',
                downColor: '#ef5350',
                borderVisible: true,
                wickUpColor: '#26a69a',
                wickDownColor: '#ef5350',
                title: isLong ? 'YT / stETH' : 'PT / stETH',
            })
            priceSeries.setData(priceData)
            const volSeries = chart.addHistogramSeries({
                color: '#26a69a',
                priceFormat: {
                    type: 'volume',
                },
                priceScaleId: '',
                title: 'Volume (stETH)',
            })
            chart.priceScale('').applyOptions({
                scaleMargins: {
                    top: 0.8,
                    bottom: 0,
                },
            })
            volSeries.setData(volData)
            const avgSeries = chart.addLineSeries({
                color: 'white',
            })
            avgSeries.setData(avgData)
            chart.timeScale().fitContent()
            window.addEventListener('resize', handleResize)
            return () => {
                window.removeEventListener('resize', handleResize)
                chart.remove()
            }
        }
    }, [status])

    useEffect(() => {
        if (resp.status === 'success' && resp.data) {
            const yieldData = normalizeYield(resp.data.impliedYields.items)

            const chart = createChart(yieldChartContainerRef.current, {
                width: yieldChartContainerRef.current.clientWidth
                    ? 0
                    : yieldChartContainerRef.current.clientWidth,
                height: yieldChartContainerRef.current.clientHeight,
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
                        top: 0.3,
                        bottom: 0.5,
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
            })
            const handleResize = () => {
                chart.applyOptions({
                    width: yieldChartContainerRef.current.clientWidth
                        ? 0
                        : yieldChartContainerRef.current,
                })
            }

            const implSeries = chart.addLineSeries({
                color: 'green',
                title: 'Implied Yield',
            })
            implSeries.setData(yieldData)

            const underlyingSeries = chart.addLineSeries({
                color: 'blue',
                title: 'Real Yield',
            })
            underlyingSeries.setData(yieldData)
            chart.timeScale().fitContent()

            window.addEventListener('resize', handleResize)

            return () => {
                window.removeEventListener('resize', handleResize)
                chart.remove()
            }
        }
    }, [resp.status])

    if (status !== 'success') return <></>
    return (
        <div className="grid grid-cols-2 h-screen w-full">
            <div ref={yieldChartContainerRef} className="chart-container" />
            <div ref={chartContainerRef} className="chart-container" />
        </div>
    )
}

export default TradeChart
