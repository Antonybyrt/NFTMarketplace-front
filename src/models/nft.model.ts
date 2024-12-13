
export interface INFT {
    name: string;
    symbol: string;
    user: number;
    pack: number;
}

export type INFTId = INFT & { _id: string };


export interface Nft {
    id: string;
    name: string;
    image: string;
    description?: string;
    collectionId: string;
  }

