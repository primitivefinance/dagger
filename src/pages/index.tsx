'use client'

import { useIndexer } from "@/store/IndexerContext"
import { usePrices } from "@/store/PricesContext"
import { tokens } from "@/data/tokens"
import { title, subtitle } from '@/data/copy/home'
import { useEffect } from "react"

export default function Home() {
  const { pools, updateIndexer } = useIndexer();
  const { state } = usePrices();
  const { prices } = state;
  console.log(pools)
  useEffect(() => {
    updateIndexer
  },[updateIndexer])

  if (!pools || !prices) return null

  return (
    <>
      <div className="w-full py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="max-w-md gap-4 flex flex-col">
            <h1>{title}</h1>
            <h3 className="leading-tight text-dagger3 font-normal">
              {subtitle}              
            </h3>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-4xl gap-2 flex flex-col">
        <div className="flex flex-row items-center w-full justify-between">
          <h3>All pools ({pools.length})</h3>
          <button className="p-2" onClick={() => location.href = '/create-pool'}>
            <div className="flex flex-row items-center gap-1">
              <svg className="w-4 h-3 text-dagger4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14m-7 7V5" />
              </svg>
              Create pool
            </div>
          </button>
        </div>
        <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid">
          <table>
            <thead>
              <tr>
                <th className="text-left">Composition</th>
                <th className="text-right">TVL</th>
                <th className="text-right">Volume (24h)</th>
                <th className="text-right">Volume (1w)</th>
                <th className="text-right">Volume (1m)</th>
                <th className="text-right">Fees (24h)</th>
              </tr>
            </thead>
            <tbody>
              {pools.length > 0 && pools.map((pool) => (
                <tr key={pool.id.toString()} onClick={() => location.href = `/pool/${pool.id.toString()}`}>
                  <td>
                    <div className="flex flex-row items-center gap-2">
                      <div className="flex flex-row items-center">
                        <img
                          src={tokens.find(token => token.address.toLowerCase() === pool.tokenX.id.toLowerCase())?.logo}
                          alt={pool.tokenX.symbol}
                          className="rounded-full size-8" style={{ zIndex: 1 }}
                        />
                        <img
                          src={tokens.find(token => token.address.toLowerCase() === pool.tokenY.id.toLowerCase())?.logo}
                          alt={pool.tokenY.symbol}
                          className="rounded-full size-8"
                          style={{ marginLeft: '-8px' }}
                        />
                      </div>
                      <div className="flex flex-col font-bold">
                        {pool.tokenX.symbol}/{pool.tokenY.symbol}
                        <div className="flex flex-row gap-2">
                          <div className="bg-blue-600 px-2 rounded-full text-xs">{pool.parameters.swapFee}%</div>
                          <div className="bg-purple-600 px-2 rounded-full text-xs">{pool.strategy.name}</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right">//**
                  (pool.reserveX * prices[pool.tokenX.symbol] + pool.reserveY * prices[pool.tokenY.symbol]).toLocaleString(undefined)
                   */ $0.0</td>
                  <td className="text-right">$0.0</td>
                  <td className="text-right">$0.0</td>
                  <td className="text-right">$0.0</td>
                  <td className="text-right">$0.0</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}