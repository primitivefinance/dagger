import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { http, createConfig, WagmiProvider } from 'wagmi';
import { optimismSepolia } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PricesProvider } from './store/PricesContext';

import Root from './components/Root';
import Home from './pages/home';
import CreatePool from './pages/create-pool';
import Pool from './pages/pool';
import Faucet from './pages/faucet';
import Dashboard from './pages/dashboard';
import Swap from './pages/swap'
import { ThemeProvider } from './components/theme-provider';
import { createPublicClient } from 'viem';
import { walletActionsL2 } from 'viem/op-stack'

const projectId = '42c7317ebec6e24c881a534d1d6b3ba0';

export const config = createConfig({
  chains: [optimismSepolia],
  connectors: [
    injected(),
    walletConnect({ projectId }),
  ],
  transports: {
    [optimismSepolia.id]: http(),
  },
});

export const testnetClient = createPublicClient({
  chain: optimismSepolia,
  transport: http()
}).extend(walletActionsL2())


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/swap',
        element: <Swap />
      },
      {
        path: '/create-pool',
        element: <CreatePool />,
      },
      {
        path: '/pool/:id',
        element: <Pool />,
      },
      {
        path: '/faucet',
        element: <Faucet />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    document.onkeyup = (e) => {
      if (e.code === 'Space') {
        document.querySelector("html")?.setAttribute("data-theme", 'variant2');
      }
    };
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
          <PricesProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <RouterProvider router={router} />
            </ThemeProvider>
          </PricesProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App
