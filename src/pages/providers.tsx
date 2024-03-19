'use client'
import { IndexerProvider } from '@/store/IndexerContext'
import { PricesProvider } from '@/store/PricesContext'

import Header from '@/components/Header'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'

import { config } from '@/utils/wagmi'

export function Providers(props: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <IndexerProvider>
          <PricesProvider>
            <Header />
            {props.children}
          </PricesProvider>
        </IndexerProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}