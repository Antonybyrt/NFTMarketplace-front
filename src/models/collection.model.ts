export interface ICollection {
    name: string;
    symbol: string;
    ownerId: number;
}

export type ICollectionId = ICollection & { _id: string };