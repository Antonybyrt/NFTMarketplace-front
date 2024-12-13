export interface ICollection {
    name: string;
    symbol: string;
    address: string;
}

export type ICollectionId = ICollection & { _id: string };