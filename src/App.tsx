import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { http, WagmiProvider } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
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

const projectId = '42c7317ebec6e24c881a534d1d6b3ba0'

export const config = getDefaultConfig({
    appName: 'Primitive',
    chains: [mainnet],
    projectId,
    transports: {
        [mainnet.id]: http(
            'https://virtual.mainnet.rpc.tenderly.co/59ca971a-3818-4ad8-bded-14bdfc71739f'
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
                <RainbowKitProvider
                    theme={darkTheme({
                        accentColor: '#0E4CF7',
                        borderRadius: 'small',
                    })}
                    initialChain={mainnet}
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
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default App
