// src/models/nft.model.ts
export interface Nft {
    id: string;
    name: string;
    image: string;
    description?: string;
    collectionId: string;
  }
  