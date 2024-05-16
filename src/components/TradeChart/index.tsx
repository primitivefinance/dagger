import type { FC } from 'react'
import { useEffect, useRef } from 'react'

import { createChart, CrosshairMode, ColorType } from 'lightweight-charts'
import { useGraphQL } from '../../useGraphQL'
import {
    MarketPriceQueryDocument,
    MarketPriceFragment,
} from '../../queries/markets'

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
    rawHourly: (typeof MarketPriceFragment)[]
): HourlyVolume[] => {
    const parsed = rawHourly.map((tck, i) => {
        const isGreen = !rawHourly[i - 1] || tck.open > rawHourly[i - 1].close
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

const TradeChart: FC<TradeChartProps> = ({ marketId, isLong = false }) => {
    const chartContainerRef = useRef()

    // convert query to where: marketId
    const { data, status } = useGraphQL(MarketPriceQueryDocument, { marketId })

    useEffect(() => {
        if (status === 'success' && data) {
            const priceData = normalizePrice(
                data.marketPricesHourlys.items,
                isLong
            )
            const volData = normalizeVolume(data.marketPricesHourlys.items)
            const avgData = normalizeAverage(
                data.marketPricesHourlys.items,
                isLong
            )

            const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: 600,
                watermark: {
                    visible: true,
                    text: isLong ? 'YT / wstETH' : 'PT / wstETH',
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
                        color: 'rgba(42, 46, 57, 0)',
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
                        topColor: 'gray',
                        bottomColor: 'black',
                    },
                    textColor: '#d1d4dc',
                },
            })
            const handleResize = () => {
                chart.applyOptions({
                    width: chartContainerRef.current.clientWidth,
                })
            }

            const priceSeries = chart.addCandlestickSeries({
                upColor: '#26a69a',
                downColor: '#ef5350',
                borderVisible: true,
                wickUpColor: '#26a69a',
                wickDownColor: '#ef5350',
                title: isLong ? 'YT / wstETH' : 'PT / wstETH',
            })
            priceSeries.setData(priceData)

            const volSeries = chart.addHistogramSeries({
                color: '#26a69a',
                priceFormat: {
                    type: 'volume',
                },
                priceScaleId: '',
            })
            chart.priceScale('').applyOptions({
                scaleMargins: {
                    top: 0.8,
                    bottom: 0,
                },
            })
            volSeries.setData(volData)

            const avgSeries = chart.addLineSeries({
                color: 'gray',
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

    if (status !== 'success') return <></>
    return (
        <div
            ref={chartContainerRef}
            className="chart-container bg-color-black"
        />
    )
}

export default TradeChart
