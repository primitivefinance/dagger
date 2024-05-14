import type { FC } from 'react'
import { useEffect, useRef } from 'react'

import { createChart, ColorType } from 'lightweight-charts'
import { useGraphQL } from '../../useGraphQL'
import { MarketPriceQueryDocument } from '../../queries/markets'

export type TradeChartProps = {
    marketId: string
    isLong: boolean
}

const TradeChart: FC<TradeChartProps> = ({ marketId, isLong = true }) => {
    const chartContainerRef = useRef()

    // convert query to where: marketId
    const { data } = useGraphQL(MarketPriceQueryDocument, { limit: 100 })

    useEffect(() => {
        if (!chartContainerRef?.current) return
        const chart = createChart(chartContainerRef?.current, {
            layout: {
                background: { type: ColorType.Solid, color: 'black' },
            },
            width: chartContainerRef?.current.clientWidth,
            height: 300,
        })

        const handleResize = () => {
            chart.applyOptions({
                width: chartContainerRef?.current.clientWidth,
            })
        }

        const ptSeries = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: true,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        })
        ptSeries.setData(isLong ? longPricePath : shortPricePath)
        chart.timeScale().fitContent()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            chart.remove()
        }
    }, [isLong])
    return <></>
}

export default TradeChart
