export interface IUser {
    firstname: string;
    name: string,
    mail: string;
}

export type IUserId = IUser & { _id: string };