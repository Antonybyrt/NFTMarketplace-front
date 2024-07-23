"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { AuthService } from '../../../service/auth.service';
import { NFTService } from '../../../service/nft.service';
import { ServiceErrorCode } from '../../../service/service.result';
import NFTsTable from '../../../components/NFTsTable';
import { IUserId } from '@/models/user.model';
import { ErrorService } from '@/service/error.service';
import { abi } from '../../../../hardhat/artifacts/contracts/NFTFactory.sol/NFTFactory.json';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { INFT } from '@/models/nft.model';

const NFT_FACTORY_ADDRESS = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'; // Remplacez par l'adresse de votre contrat déployé
const NFT_ADDRESS = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707';

const CollectionsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<IUserId>();
  const [NFTs, setNFTs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [selectedNFT, setSelectedNFT] = useState(null);

  const { data: hash, isPending, error, writeContract } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed} = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setIsLoading(false);
        ErrorService.errorMessage('Account', 'Please log in before accessing to informations')
        router.push('../');
        return;
      }
      const res = await AuthService.me(token);
      if (res.errorCode === ServiceErrorCode.success && res.result) {
        setUser(res.result);
        fetchNfts(res.result._id);
      } else {
        router.push('../auth/logout');
      }
      setIsLoading(false);
    };

    const fetchNfts = async (userId:any) => {
      const res = await NFTService.getNFTByUser(userId);
      if (res.errorCode === ServiceErrorCode.success && res.result) {
        setNFTs(res.result as []);
      }
    };

    fetchUser();
  }, [token]);

  const handleSellNFT = async (nft: any) => {
    const price = await ErrorService.promptPrice('Enter the price in Wei for the NFT', '1000000000000000000');
    if (price) {
      // Here, you would call the sell function via wagmi
      const sellNFT = async (price: string, collection: string, tokenId: number) => {
        console.log(Number(price), collection, tokenId)
        try {
            console.log('1')
            writeContract({
              address: NFT_FACTORY_ADDRESS,
              abi,
              functionName: 'sell',
              args: [Number(price), collection, tokenId],
            });
            console.log(isConfirmed)

            if (isConfirmed) {
                console.log('2')
                const updateData: Partial<INFT> = {
                    price: Number(price),
                    listed: true
                  };
                  const updateRes = await NFTService.updateNFT(nft._id, updateData);
                  if (updateRes.errorCode === ServiceErrorCode.success) {
                      ErrorService.successMessage('NFT listed for sale', `NFT ${tokenId} listed for ${price} Wei`);
                  } else {
                    ErrorService.errorMessage('Error', 'Failed to update NFT in the database');
                  }
            }
          } catch (error) {
            ErrorService.errorMessage('Error', `Failed to list NFT ${tokenId} for sale: ${error}`);
          }
      };

      await sellNFT(price, nft.pack.address, nft.tokenId);
    } else {
        ErrorService.errorMessage('Sell', 'No price');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4 text-white bg-dark">
      <h2>My NFT Collections</h2>
      {NFTs.length > 0 ? (
        <NFTsTable NFTs={NFTs} onSellNFT={handleSellNFT} />
      ) : (
        <div>No collections found.</div>
      )}
    </div>
  );
};

export default CollectionsPage;
