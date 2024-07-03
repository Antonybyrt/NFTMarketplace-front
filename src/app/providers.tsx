'use client';

import {
    getDefaultConfig,
    RainbowKitProvider,
  } from '@rainbow-me/rainbowkit';
  import { WagmiProvider } from 'wagmi';
  import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    hardhat,
  } from 'wagmi/chains';
  import {
    QueryClientProvider,
    QueryClient,
  } from "@tanstack/react-query";
  import Test from './page';
  import { AppProps } from 'next/app';
  
  import { NextPage } from 'next';
  import { ReactElement, ReactNode } from 'react';
  import { Config, getConnectorClient } from '@wagmi/core'
import { BrowserProvider, JsonRpcSigner } from 'ethers'
import type { Account, Chain, Client, Transport } from 'viem'

const config = getDefaultConfig({
    appName: 'NFTMarketplace',
    projectId: '40ffbdb9a70d28b07e3270fc658d1439',
    chains: [mainnet, polygon, optimism, arbitrum, base, hardhat],
    ssr: true, // If your dApp uses server side rendering (SSR)
  });

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }
  const provider = new BrowserProvider(transport, network)
  const signer = new JsonRpcSigner(provider, account.address)
  console.log(signer)
  return signer
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getEthersSigner(
  config: Config,
  { chainId }: { chainId?: number } = {},
) {
  const client = await getConnectorClient(config, { chainId })
  return clientToSigner(client)
}
