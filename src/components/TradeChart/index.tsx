import type { FC } from 'react'
import { useEffect, useRef } from 'react'

import { createChart, ColorType } from 'lightweight-charts'

export type priceData = {
    time: string
    value: number
}[]

const mockData: priceData = [
    { time: `2024-04-19`, value: 0.03 },
    { time: '2024-04-20', value: 0.05 },
    { time: '2024-04-21', value: 0.02 },
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

    const pricePath: priceData = [
        { time: mockData[0].time, value: initialRate -1 },
        { time: expiry, value: 0 },
    ]

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
        const guidelineSeries = chart.addLineSeries({color: 'red'})
        const dataSeries = chart.addLineSeries({
            color: '#2962FF',
        })
        guidelineSeries.setData(pricePath)
        dataSeries.setData(mockData)

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            chart.remove()
        }
    }, [mockData])

    return <div ref={chartContainerRef} />
}

export default TradeChart
