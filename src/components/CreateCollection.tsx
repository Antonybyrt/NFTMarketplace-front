import { IUser, IUserId } from '@/models/user.model';
import { ServiceErrorCode } from '@/service/service.result';
import * as React from 'react';
import { 
  type BaseError,
  useWaitForTransactionReceipt, 
  useWriteContract,
  useReadContract,
  useWatchContractEvent
} from 'wagmi';
import { abi } from '../../hardhat/artifacts/contracts/NFTFactory.sol/NFTFactory.json'; 
import { CollectionService } from '../service/collection.service'; // Assurez-vous d'importer le service correctement

const NFT_FACTORY_ADDRESS = '0x5C5fE5926a72a530C8A517780857eEC7333c362D'; // Remplacez par l'adresse de votre contrat déployé

interface CreateCollectionProps {
  user: IUserId | undefined; // Remplacez `any` par le type de votre utilisateur
}

export function CreateCollection({user}: CreateCollectionProps) {
    const [shouldRead, setShouldRead] = React.useState(false);
    const [formData, setFormData] = React.useState({ name: '', symbol: '' });

    const {
        data: hash,
        isPending,
        error,
        writeContract
    } = useWriteContract();

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
            onSuccess: async () => {
                setShouldRead(true);
                // saveCollectionToWeb2 is called when the event is received
            }
        });

        useWatchContractEvent({
          address: NFT_FACTORY_ADDRESS,
          abi,
          eventName: 'CollectionCreated',
          onLogs(logs) {
              console.log('Event logs:', logs);
              logs.forEach(log => {
                  const { args } = log;
                  console.log(args?.collectionAddress);
                  const collectionAddress = args?.collectionAddress;

                      saveCollectionToWeb2(collectionAddress);
                  
              });
          },
      });

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const symbol = formData.get('symbol') as string;
        setFormData({ name, symbol });
        await writeContract({
            address: NFT_FACTORY_ADDRESS,
            abi,
            functionName: 'createCollection',
            args: [String(name), String(symbol)],
        });
    }

    async function saveCollectionToWeb2(collectionAddress: string) {
      if (!user) {
        console.error('User not found');
        return;
      }
      console.log('hey')
        const collectionData = {
            name: formData.name,
            symbol: formData.symbol,
            address: collectionAddress,
            user: user 
        };
        const result = await CollectionService.createCollection(collectionData);
        if (result.errorCode === ServiceErrorCode.success) {
            console.log('Collection saved successfully');
        } else {
            console.error('Failed to save collection');
        }
    }

    return (
      <div className="container mt-4">
      <h2>Create a New NFT Collection</h2>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Collection Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            placeholder="ex: MyCollection"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="symbol" className="form-label">Symbol</label>
          <input
            id="symbol"
            name="symbol"
            type="text"
            className="form-control"
            placeholder="ex: MYC"
            required
          />
        </div>
        <button
          className="btn btn-primary"
          disabled={isPending}
          type="submit"
        >
          {isPending ? 'Confirming...' : 'Create'}
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
    </div>
    );
}
