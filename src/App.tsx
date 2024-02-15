import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { http, createConfig, WagmiProvider } from 'wagmi';
import { optimismSepolia } from 'wagmi/chains';
import { injected, safe, walletConnect } from 'wagmi/connectors';

import Header from './components/header';
import Home from './pages/home';
import CreatePool from './pages/create-pool';
import Pool from './pages/pool';

const projectId = '42c7317ebec6e24c881a534d1d6b3ba0';

export const config = createConfig({
  chains: [optimismSepolia],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    safe(),
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
  }
]);

function App() {
  return (
    <WagmiProvider config={config}>
      <Header />
      <RouterProvider router={router} />
    </WagmiProvider>
  );
}

export default App
