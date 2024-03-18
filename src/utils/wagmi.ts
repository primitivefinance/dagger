import { http, createConfig } from 'wagmi'
import { optimismSepolia } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

const projectId = '42c7317ebec6e24c881a534d1d6b3ba0'

export const config = createConfig({
  chains: [optimismSepolia],
  connectors: [
    injected(),
    walletConnect({ projectId }),
  ],
  ssr: true,
  transports: {
    [optimismSepolia.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}


