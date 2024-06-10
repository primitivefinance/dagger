import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { http, useSwitchChain, WagmiProvider } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
    Chain,
    RainbowKitProvider,
    darkTheme,
    getDefaultConfig,
} from '@rainbow-me/rainbowkit'

import Root from './components/Root'
import Home from './pages/home'
import Market from './pages/market'
import Faucet from './pages/faucet'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'
import Curator from './pages/curator'
import { TooltipProvider } from './components/ui/tooltip'
import YieldPage from './pages/yield'
import { OutputAmountProvider } from './store/OutputAmountContext'

const projectId = '42c7317ebec6e24c881a534d1d6b3ba0'

export const primitiveVirtualNet = {
    id: 753712,
    name: 'Tenderly (RMM)',
    iconUrl: 'https://www.primitive.xyz/favicon/favicon-32x32.png',
    iconBackground: '#000',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: [
                'https://virtual.mainnet.rpc.tenderly.co/ab7a4b34-a4da-4803-8130-01cf2230dbe6',
            ],
        },
    },
    blockExplorers: {
        default: {
            name: 'tenderly',
            url: 'https://dashboard.tenderly.co/Prim/rmm/testnet/d67a1c38-5e02-429e-bbd1-bbdb0e3e71b0',
        },
    },
} as const satisfies Chain

export const config = getDefaultConfig({
    appName: 'Primitive',
    chains: [primitiveVirtualNet],
    projectId,
    transports: {
        [primitiveVirtualNet.id]: http(
            'https://virtual.mainnet.rpc.tenderly.co/ab7a4b34-a4da-4803-8130-01cf2230dbe6'
        ),
    },
})

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/market/:id',
                element: (
                    <Home>
                        <Market />
                    </Home>
                ),
            },
            {
                path: '/faucet',
                element: <Faucet />,
            },
            {
                path: '/curator/:id',
                element: <Curator />,
            },
            {
                path: '/yield',
                element: <YieldPage />,
            },
        ],
    },
])

const queryClient = new QueryClient()

function App(): JSX.Element {
    useEffect(() => {
        document.onkeyup = (e) => {
            if (e.code === 'Space') {
                document
                    .querySelector('html')
                    ?.setAttribute('data-theme', 'variant2')
            }
        }
    }, [])

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <OutputAmountProvider>
                    <RainbowKitProvider
                        theme={darkTheme({
                            accentColor: '#0E4CF7',
                            borderRadius: 'small',
                        })}
                        initialChain={primitiveVirtualNet}
                    >
                        <ThemeProvider
                            defaultTheme="dark"
                            storageKey="vite-ui-theme"
                        >
                            <TooltipProvider delayDuration={50}>
                                <RouterProvider router={router} />

                                <Toaster />
                            </TooltipProvider>
                        </ThemeProvider>
                    </RainbowKitProvider>
                </OutputAmountProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default App
