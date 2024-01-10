import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'
import { defineChain } from "viem"

const zetaTestnet = defineChain({
  id: 7001,
  name: "zetaAthens3Testnet",
  nativeCurrency: { name: "Zeta", symbol: "aZeta", decimals: 18 },
  rpcUrls: {
      default: { http: ["https://rpc.ankr.com/zetachain_evm_athens_testnet"] },
  },
  blockExplorers: {
      default: { name: "Zetachain Explorer", url: "https://explorer.zetachain.com/" },
  },
})

export const config = createConfig({
  chains: [zetaTestnet],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'Create Wagmi' }),
    walletConnect({ projectId: "57c960043d4565be37e1f8499ed07309" }),
  ],
  ssr: true,
  transports: {
    [zetaTestnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
