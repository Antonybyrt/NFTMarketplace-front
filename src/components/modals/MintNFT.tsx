import * as React from 'react';
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { abi } from '../../../hardhat/artifacts/contracts/NFTFactory.sol/NFTFactory.json';

const NFT_FACTORY_ADDRESS = '0x5C5fE5926a72a530C8A517780857eEC7333c362D'; // Remplacez par l'adresse de votre contrat déployé

export function MintNFTModal({ show, handleClose, collection }: any) {
  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const symbol = formData.get('symbol') as string;
    writeContract({
      address: NFT_FACTORY_ADDRESS,
      abi,
      functionName: 'addNFTToCollection',
      args: [collection.address, String(name), String(symbol)],
    });
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
          {hash && <div className="mt-3 alert alert-info">Transaction Hash: {hash}</div>}
          {isConfirming && <div className="mt-3 alert alert-warning">Waiting for confirmation...</div>}
          {isConfirmed && <div className="mt-3 alert alert-success">Transaction confirmed.</div>}
          {error && (
            <div className="mt-3 alert alert-danger">
              Error: {(error as BaseError).shortMessage || error.message}
            </div>
          )}
        </form>
      </Modal.Body>
    </Modal>
  );
}
