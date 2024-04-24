import type { FC } from 'react'
import { useEffect, useRef } from 'react'

import { createChart, ColorType } from 'lightweight-charts'

export type priceData = {
    time: string
    value: number
}[]

const longMockData: priceData = [
    { time: `2024-04-19`, value: 0.03 },
    { time: '2024-04-20', value: 0.05 },
    { time: '2024-04-21', value: 0.02 },
]

const shortMockData: priceData = [
    { time: `2024-04-19`, value: 0.97 },
    { time: '2024-04-20', value: 0.95 },
    { time: '2024-04-21', value: 0.98 },
]

export type TradeChartProps = {
    isLoading: boolean
    data?: priceData
    initialRate: number
    currentRate?: number
    expiry: string
    isLong: boolean
}

const TradeChart: FC<TradeChartProps> = ({
    isLoading,
    data,
    initialRate,
    currentRate,
    expiry,
    isLong,
}) => {
    const chartContainerRef = useRef()

    const longPricePath: priceData = [
        { time: longMockData[0].time, value: initialRate - 1 },
        { time: expiry, value: 0 },
    ]

    const shortPricePath: priceData = [
        { time: shortMockData[0].time, value: 1 / initialRate },
        { time: expiry, value: 1 },
    ]

    useEffect(() => {
        console.log(isLong ? 'Long - Buy YT' : 'Short - Buy PT')
    }, [isLong])

    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'black' },
            },
            width: chartContainerRef.current.clientWidth,
            height: 300,
        })

        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth })
        }

        chart.timeScale().fitContent()
        const guidelineSeries = chart.addAreaSeries({
            lineColor: 'black',
            topColor: '#2962FF',
        })
        const dataSeries = chart.addLineSeries({
            crosshairMarkerVisible: true,
            color: '#2962FF',
        })
        guidelineSeries.setData(isLong ? longPricePath : shortPricePath)
        dataSeries.setData(isLong ? longMockData : shortMockData)

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            chart.remove()
        }
    }, [isLong])

    return <div ref={chartContainerRef} />
}

export default TradeChart
