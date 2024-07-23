
export interface INFT {
    name: string;
    symbol: string;
    tokenId: number;
    user: number;
    pack: number;
    tokenURI: string
}

export type INFTId = INFT & { _id: string };


export interface Nft {
    id: string;
    name: string;
    image: string;
    description?: string;
    collectionId: string;
  }

