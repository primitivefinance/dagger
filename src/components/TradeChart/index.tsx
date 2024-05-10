import type { FC } from 'react'
import { useEffect, useRef } from 'react'

import { createChart, ColorType } from 'lightweight-charts'
import { useGraphQL } from 'useGraphQL'
import { MarketPriceQueryDocument } from 'queries/markets'

export type TradeChartProps = {
    market: number
    isPT: boolean
}

const TradeChart: FC<TradeChartProps> = ({ market, isPT = true }) => {
    const chartContainerRef = useRef()
    const { data } = useGraphQL(MarketPriceQueryDocument, { limit: 100 })
    const ptData = data?.pools?.items

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

        const ptSeries = chart.addCandlestickSeries({
            upColor: '#26a69a',
            downColor: '#ef5350',
            borderVisible: true,
            wickUpColor: '#26a69a',
            wickDownColor: '#ef5350',
        })
        ptSeries.setData(isPT ? longPricePath : shortPricePath)
        chart.timeScale().fitContent()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            chart.remove()
        }
    }, [isPT])

    return <div ref={chartContainerRef} />
}

export default TradeChart
