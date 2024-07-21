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

const NFT_FACTORY_ADDRESS = '0x7c7e96493C7357c8de2b769fFd591Be12cE66885'; // Remplacez par l'adresse de votre contrat déployé
const NFT_ADDRESS = '0x83f16a6118f7856d469E2dfe6b71599703BC939A';

export function MintNFTModal({ show, handleClose, collection, user }: any) {
  const { data: hash, isPending, error, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const [formData, setFormData] = useState<{ name: string, symbol: string } | null>(null);
  const [createdNFT, setCreatedNFT] = useState(false);

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
      args: [collection.address, String(name), String(symbol), 1],
    });
  }

  useEffect(() => {
    if(createdNFT) {
      return;
    }
    if (isConfirmed && formData) {
      const createNFT = async () => {
        const newNFT: INFT = {
          name: formData.name,
          symbol: formData.symbol,
          user: user,
          pack: collection
        };

        const result = await NFTService.createNFT(newNFT);

        if (result.errorCode === ServiceErrorCode.success) {
          ErrorService.successMessage('NFT created', 'hash :' + hash);
        } else {
          ErrorService.errorMessage('Failed to create', 'Error creating NFT in database');
        }
      };
      createNFT();
      //MetaMaskService.addNFTToMetaMask(NFT_FACTORY_ADDRESS, 9)
      setCreatedNFT(true);
    } else if (error) {
      ErrorService.errorMessage('Failed to create', (error as BaseError).message);
    }
  }, [isConfirmed, formData, collection, user, hash, error]);

  useWatchContractEvent({
    address: NFT_ADDRESS,
    abi,
    eventName: 'NFTAdded',
    listener: async (event) => {
      console.log(event)
    },
  });

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
