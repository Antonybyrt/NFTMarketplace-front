import {ServiceResult} from "./service.result";
import axios from "axios";
import { APIService } from "./api.service";
import { INFT, INFTId } from "@/models/nft.model";

export class NFTService {


    static async createNFT(input: INFT): Promise<ServiceResult<INFTId>> {
        try {
            console.log(input)
            const res = await axios.post(`${APIService.baseURL}/nft`, input);
            if (res.status === 201) {
                return ServiceResult.success<INFTId>(res.data);
            }
            return ServiceResult.failed();
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    static async getNFTByUser(userId: string): Promise<ServiceResult<INFTId[]>> {
        try {
            const res = await axios.get(`${APIService.baseURL}/nft/user/${userId}`);
            if (res.status === 200) {
                return ServiceResult.success<INFTId[]>(res.data);
            }
            return ServiceResult.failed();
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    static async updateNFT(idNFT: string, input: Partial<INFT>): Promise<ServiceResult<INFTId>> {
        try {
            const res = await axios.patch(`${APIService.baseURL}/nft/${idNFT}`, input);
            if (res.status === 201) {
                return ServiceResult.success<INFTId>(res.data);
            }
            return ServiceResult.failed();
        } catch (err) {
            return ServiceResult.failed();
        }
    }


}