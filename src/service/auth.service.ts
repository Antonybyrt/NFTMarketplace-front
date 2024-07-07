import {ServiceResult} from "./service.result";
import axios, {AxiosError, AxiosRequestHeaders} from "axios";
import {IUserId} from "../models/user.model";
import {ISessionId} from "../models/session.model";
import { ISubscribe } from "@/models/subscribe.model";
import { APIService } from "./api.service";
import { ILogin } from "@/models/login.model";

export class AuthService {

    static async subscribe(input: ISubscribe): Promise<ServiceResult<IUserId>> {
        try {
            const res = await axios.post(`${APIService.baseURL}/auth/subscribe`, input);
            if(res.status === 201) {
                return ServiceResult.success<IUserId>(res.data);
            }
            return ServiceResult.failed();
        } catch(err) {
            if(err instanceof AxiosError && err.response?.status === 409) {
                return ServiceResult.conflict();
            }
            return ServiceResult.failed();
        }
    }

    static async login(input: ILogin): Promise<ServiceResult<ISessionId>> {
        try {
            const res = await axios.post(`${APIService.baseURL}/auth/login`, input);
            if(res.status === 201) {
                return ServiceResult.success<ISessionId>(res.data);
            }
            return ServiceResult.failed();
        } catch(err) {
            if(err instanceof AxiosError && err.response?.status === 404) {
                return ServiceResult.notFound();
            }
            return ServiceResult.failed();
        }
    }

    static async me(token: string): Promise<ServiceResult<IUserId>> {
        try {
            const res = await axios.get(`${APIService.baseURL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                } as AxiosRequestHeaders
            });
            if(res.status === 200) {
                return ServiceResult.success<IUserId>(res.data);
            }
            return ServiceResult.failed();
        } catch(err) {
            return ServiceResult.failed();
        }
    }

}