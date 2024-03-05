import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { http, createConfig, WagmiProvider } from 'wagmi';
import { optimismSepolia } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { IndexerProvider } from './store/IndexerContext';
import { PricesProvider } from './store/PricesContext';

import Header from './components/Header';
import Home from './pages/home';
import CreatePool from './pages/create-pool';
import Pool from './pages/pool';
import Faucet from './pages/faucet';
import Dashboard from './pages/dashboard';

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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
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
  {
    path: '/dashboard',
    element: <Dashboard />,
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
        <IndexerProvider>
          <PricesProvider>
            <Header />
            <RouterProvider router={router} />
          </PricesProvider>
        </IndexerProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App
