// src/models/nftCollection.model.ts
export interface User {
  _id: string;
  name: string;
  firstname: string;
  mail: string;
  signature: string;
}

export interface NftCollection {
  _id: string;
  name: string;
  symbol: string;
  address: string;
  user: User;
  image?: string; // Si vous avez une image dans votre collection
  description?: string; // Optionnel, si vous avez une description
}
