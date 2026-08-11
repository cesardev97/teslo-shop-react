import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";
import type { AuthLoginRequest } from "../interfaces/auth.request";


export const loginAction = async ({ email, password }: AuthLoginRequest) => {

    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
            email,
            password
        });

        return data;

    } catch (error) {
        throw error;
    }
}