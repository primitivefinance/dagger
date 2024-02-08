import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { optimismSepolia } from 'viem/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';

import Header from './components/header';
import Home from './pages/home';
import CreatePool from './pages/create-pool';
import Pool from './pages/pool';

const { chains, publicClient } = configureChains(
  [optimismSepolia],
  [
    alchemyProvider({ apiKey: 'wzhgRGq_Z2cxhGkBnSTcfsGRSHr9FHKM' }),
  ],
);

const { connectors } = getDefaultWallets({
  chains,
  appName: 'Dagger',
  projectId: '42c7317ebec6e24c881a534d1d6b3ba0',
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
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
  }
]);

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} initialChain={optimismSepolia}>
        <Header />
        <RouterProvider router={router} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App
