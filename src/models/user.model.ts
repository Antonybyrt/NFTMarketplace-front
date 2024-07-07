export interface IUser {
    firstname: string;
    name: string,
    login: string;
}

export type IUserId = IUser & { _id: string };