import * as React from 'react';
import { useEffect, useState } from 'react';
import { type BaseError, useWaitForTransactionReceipt, useWriteContract, useWatchContractEvent } from 'wagmi';
import Modal from 'react-bootstrap/Modal';
import { abi } from '../../../hardhat/artifacts/contracts/NFTFactory.sol/NFTFactory.json';
import { ErrorService } from '@/service/error.service';
import { NFTService } from '@/service/nft.service';
import { INFT } from '@/models/nft.model';
import { ServiceErrorCode } from '@/service/service.result';
import { MetaMaskService } from '@/service/metaMask.service';

const NFT_FACTORY_ADDRESS = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'; // Remplacez par l'adresse de votre contrat déployé
const NFT_ADDRESS = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';

export function MintNFTModal({ show, handleClose, collection, user }: any) {
  const { data: hash, isPending, error, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed} = useWaitForTransactionReceipt({ hash });

  const [formData, setFormData] = useState<{ name: string, symbol: string } | null>(null);
  const [createdNFT, setCreatedNFT] = useState(false);

  useWatchContractEvent({
    address: NFT_FACTORY_ADDRESS,
    abi,
    eventName: 'NFTMinted',
    onLogs(logs) {
      if(createdNFT) {
        console.log('Event logs:', logs);
        logs.forEach(log => {
            const { args } = log;
            console.log('last :',args?.tokenId);
            const tokenId = Number(args?.tokenId);
            console.log('new :', tokenId);

            saveNFTToWeb2(tokenId);
            MetaMaskService.addNFTToMetaMask(NFT_FACTORY_ADDRESS, tokenId);
            setCreatedNFT(false);
        });
      }
    },
});

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const symbol = formData.get('symbol') as string;
    setFormData({ name, symbol });
    writeContract({
      address: NFT_FACTORY_ADDRESS,
      abi,
      functionName: 'addNFTToCollection',
      args: [collection.address, String(name), String(symbol)],
    });

    if(isConfirmed) {
      setCreatedNFT(true);
    }

  }

  async function saveNFTToWeb2(tokenId: number) {
    if (!user) {
      console.error('User not found');
      return;
    }
    if (formData) {
      const NFTData: INFT = {
        name: formData.name,
        symbol: formData.symbol,
        tokenId: tokenId,
        user: user,
        pack: collection
      }

      try {
        const result = await NFTService.createNFT(NFTData);
        if (result.errorCode === ServiceErrorCode.success) {
          ErrorService.successMessage('NFT minted', 'hash :' + hash);
        } else {
          ErrorService.errorMessage('Error', 'Failed to mint NFT');
        }
      } catch (error) {
        ErrorService.errorMessage('Failed to mint NFT', 'Error :' + error);
      }
    }
  }

  return (
    <Modal show={show} onHide={handleClose} className="text-white">
      <Modal.Header closeButton className="bg-dark text-white">
        <Modal.Title>Mint NFT for {collection?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">NFT Name</label>
            <input name="name" id="name" className="form-control bg-dark text-white" placeholder="MyNFT" required />
          </div>
          <div className="mb-3">
            <label htmlFor="symbol" className="form-label">NFT Symbol</label>
            <input name="symbol" id="symbol" className="form-control bg-dark text-white" placeholder="MNFT" required />
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="btn btn-primary"
          >
            {isPending ? 'Confirming...' : 'Mint'}
          </button>
          {isConfirming && <div className="mt-3 alert alert-warning">Waiting for confirmation...</div>}
        </form>
      </Modal.Body>
    </Modal>
  );
}
