import * as React from 'react';
import { 
  type BaseError,
  useWaitForTransactionReceipt, 
  useWriteContract 
} from 'wagmi';
import {abi} from '../../hardhat/artifacts/contracts/NFTFactory.sol/NFTFactory.json'; 

const NFT_FACTORY_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // Replace by the address of your deployed contract

export function CreateCollection() {
    const {
        data: hash,
        isPending,
        error,
        writeContract
    } = useWriteContract()

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        })

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const name = formData.get('name') as string
        const symbol = formData.get('symbol') as string
        writeContract({
            address: NFT_FACTORY_ADDRESS,
            abi,
            functionName: 'createCollection',
            args: [String(name), String(symbol)],
        })
    }

    return (
        <form onSubmit={submit}>
          <input name="name" placeholder="ex : MyCollection" required />
          <input name="symbol" placeholder="ex : MYC" required />
          <button 
          disabled={isPending} 
          type="submit"
          >
            {isPending ? 'Confirming...' : 'Create'}
          </button>
          {hash && <div>Transaction Hash: {hash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          {error && (
            <div>Error: {(error as BaseError).shortMessage || error.message}</div>
          )}
        </form>
    )

}