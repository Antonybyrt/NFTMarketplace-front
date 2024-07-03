"use client";

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import NFTFactoryABI from '../../hardhat/artifacts/contracts/NFTFactory.sol/NFTFactory.json'; 
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { getEthersSigner, clientToSigner } from './providers';
import type { Account, Chain, Client, Transport } from 'viem'

const NFT_FACTORY_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

function Page() {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const provider = getEthersSigner(config)

  const handleGenerateNFT = async () => {
    if (!signer || !isConnected) {
      alert('Please connect your wallet');
      return;
    }

    setLoading(true);

    try {
      const nftFactoryContract = new ethers.Contract(NFT_FACTORY_ADDRESS, NFTFactoryABI.abi, address);
      const tx = await nftFactoryContract.generateNFT('MyNFT', 'MNFT');
      await tx.wait();
      alert('NFT generated successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to generate NFT');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 12,
        }}
      >
        <ConnectButton />
      </div>
      <div style={{ padding: 20 }}>
        <button onClick={handleGenerateNFT} disabled={loading}>
          {loading ? 'Generating...' : 'Generate NFT'}
        </button>
      </div>
    </div>
  );
}

export default Page;
