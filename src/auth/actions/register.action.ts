import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";
import type { AuthRegisterRequest } from "../interfaces/auth.request";

export const registerAction = async ({ fullname, email, password }: AuthRegisterRequest) => {

    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
            fullName: fullname,
            email,
            password
        })

        return data;

    } catch (error) {
        throw error;
    }
}