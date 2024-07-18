export interface INFT {
    name: string;
    symbol: string;
    user: number;
    pack: number;
}

export type INFTId = INFT & { _id: string };