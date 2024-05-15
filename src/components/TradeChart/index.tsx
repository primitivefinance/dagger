import type { FC } from 'react'
import { useEffect, useRef } from 'react'

import { createChart, ColorType } from 'lightweight-charts'
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
            open: isLong ? tck.open : 1 + tck.open,
            high: isLong ? tck.high : 1 + tck.high,
            low: isLong ? tck.high : 1 + tck.low,
            close: isLong ? tck.close : 1 + tck.close,
        }
    })
    return parsed
}

const normalizeVolume = (
    rawHourly: (typeof MarketPriceFragment)[]
): HourlyVolume[] => {
    const parsed = rawHourly.map((tck) => {
        return {
            time: tck.id,
            value: tck.volume,
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
            value: isLong ? tck.average : 1 + tck.average,
        }
    })
    return parsed
}

const TradeChart: FC<TradeChartProps> = ({ marketId, isLong = true }) => {
    const chartContainerRef = useRef()

    // convert query to where: marketId
    const { data, status } = useGraphQL(MarketPriceQueryDocument, { marketId })

    useEffect(() => {
        if (status === 'success' && data) {
            console.log(data.marketPricesHourlys)
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
                layout: {
                    background: { type: ColorType.Solid, color: 'black' },
                },
                width: chartContainerRef.current.clientWidth,
                height: 300,
                overlayPriceScales: true,
                rightPriceScale: {
                    autoScale: true,
                },
                timeScale: {
                    secondsVisible: false,
                    timeVisible: true,
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
            })
            priceSeries.setData(priceData)

            const volSeries = chart.addHistogramSeries({
                color: '#00FFFF',
                baseLineWidth: 2,
                priceFormat: {
                    type: 'volume',
                },
            })
            volSeries.setData(volData)

            const avgSeries = chart.addLineSeries({
                color: '#00FFFF',
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
    return <div ref={chartContainerRef} className="chart-container" />
}

export default TradeChart
