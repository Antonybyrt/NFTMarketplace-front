// src/services/nftCollection.service.ts
import { NftCollection } from '../models/nftCollection.model';
import { Nft } from '../models/nft.model';

const API_URL = 'http://localhost:6789/collection/';
const NFT_API_URL = 'http://localhost:6789/nft/';

export const fetchNftCollections = async (): Promise<NftCollection[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch collections');
    }
    const data = await response.json();
    console.log('Fetched collections:', data); // Ajoutez cette ligne pour déboguer
    return data.map((collection: any) => ({
      ...collection,
      id: collection._id, // Mappez _id à id
    }));
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
};

export const fetchNftsByPackId = async (packId: string): Promise<Nft[]> => {
  try {
    const response = await fetch(`${NFT_API_URL}pack/${packId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch NFTs');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    throw error;
  }
};

export const fetchCollectionById = async (id: string): Promise<NftCollection> => {
  try {
    const response = await fetch(`${API_URL}${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch collection');
    }
    const data = await response.json();
    return {
      ...data,
      id: data._id, // Map _id to id
    };
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error;
  }
};
