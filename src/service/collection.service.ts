import {ServiceResult} from "./service.result";
import axios from "axios";
import { APIService } from "./api.service";
import { ICollection, ICollectionId } from "@/models/collection.model";

export class CollectionService {

    static async createCollection(input: ICollection): Promise<ServiceResult<ICollectionId>> {
        try {
            console.log(input)
            const res = await axios.post(`${APIService.baseURL}/collection`, input);
            if (res.status === 201) {
                return ServiceResult.success<ICollectionId>(res.data);
            }
            return ServiceResult.failed();
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    static async getCollectionByUser(userId: string): Promise<ServiceResult<ICollectionId[]>> {
        try {
            const res = await axios.get(`${APIService.baseURL}/collection/user/${userId}`);
            if (res.status === 200) {
                return ServiceResult.success<ICollectionId[]>(res.data);
            }
            return ServiceResult.failed();
        } catch (err) {
            return ServiceResult.failed();
        }
    }



}