export interface INFT {
    name: string;
    symbol: string;
    spicyPower?: number;
    collectionId: number;
}

export type INFTId = INFT & { _id: string };