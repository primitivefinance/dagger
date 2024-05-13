import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { http, WagmiProvider } from 'wagmi'
import {  mainnet } from 'wagmi/chains'
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

const projectId = '42c7317ebec6e24c881a534d1d6b3ba0'

export const config = getDefaultConfig({
    appName: 'Primitive',
    chains: [mainnet],
    projectId,
    transports: {
        [mainnet.id]: http(
            'https://virtual.mainnet.rpc.tenderly.co/3d94d062-ece1-4942-9ca2-f0876a728970'
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
                element: <Market />,
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
                        <RouterProvider router={router} />
                        <Toaster />
                    </ThemeProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default App
