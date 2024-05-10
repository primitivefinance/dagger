import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { http, WagmiProvider } from 'wagmi'
import { optimismSepolia, mainnet } from 'wagmi/chains'
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
import Admin from './pages/admin'

const projectId = '42c7317ebec6e24c881a534d1d6b3ba0'

export const config = getDefaultConfig({
    appName: 'Primitive',
    chains: [optimismSepolia],
    projectId,
    transports: {
        [optimismSepolia.id]: http(),
        [mainnet.id]: http(),
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
            {
                path: '/admin',
                element: <Admin />,
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
                    initialChain={optimismSepolia}
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
