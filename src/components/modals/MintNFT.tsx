import * as React from 'react';
import { useEffect } from 'react';
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { abi } from '../../../hardhat/artifacts/contracts/NFTFactory.sol/NFTFactory.json';
import { ErrorService } from '@/service/error.service';
import { NFTService } from '@/service/nft.service';
import { INFT } from '@/models/nft.model';
import { ServiceErrorCode } from '@/service/service.result';

const NFT_FACTORY_ADDRESS = '0x6b81dbEAD4Ab9B6870165A14B07F890A3db64389'; // Remplacez par l'adresse de votre contrat déployé

export function MintNFTModal({ show, handleClose, collection, user }: any) {
  const { data: hash, isPending, error, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const [formData, setFormData] = React.useState<{ name: string, symbol: string } | null>(null);

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
  }

  useEffect(() => {
    console.log('collection :',collection,'user :', user)
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
    } else if (error) {
      ErrorService.errorMessage('Failed to create', (error as BaseError).message);
    }
  }, [isConfirmed, formData, collection, user, hash, error]);

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
