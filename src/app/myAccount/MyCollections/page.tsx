"use client"
import React, { useEffect, useState } from 'react';
import {useRouter} from "next/navigation";
import { AuthService } from '../../../service/auth.service';
import { CollectionService } from '../../../service/collection.service';
import { ServiceErrorCode } from '../../../service/service.result';
import CollectionsTable from '../../../components/CollectionsTable';
import { IUserId } from '@/models/user.model';
import { MintNFTModal } from '@/components/modals/MintNFT';

const CollectionsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<IUserId>();
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setIsLoading(false);
        alert('Please, log in before accessing your information');
        router.push('../');
        return;
      }
      const res = await AuthService.me(token);
      if (res.errorCode === ServiceErrorCode.success && res.result) {
        setUser(res.result);
        fetchCollections(res.result._id);
      } else {
        router.push('../auth/logout');
      }
      setIsLoading(false);
    };

    const fetchCollections = async (userId:any) => {
      const res = await CollectionService.getCollectionByUser(userId);
      if (res.errorCode === ServiceErrorCode.success && res.result) {
        setCollections(res.result as []);
      }
    };

    fetchUser();
  }, [token]);

  const handleMintNFT = (collection:any) => {
    setSelectedCollection(collection);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCollection(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4 text-white bg-dark">
    <h2>My NFT Collections</h2>
    {collections.length > 0 ? (
      <CollectionsTable collections={collections} onMintNFT={handleMintNFT} />
    ) : (
      <div>No collections found.</div>
    )}
    <MintNFTModal
      show={showModal}
      handleClose={handleCloseModal}
      collection={selectedCollection}
    />
  </div>
  );
};

export default CollectionsPage;
