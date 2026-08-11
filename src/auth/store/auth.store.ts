import { create } from 'zustand'

import type { User } from '@/interfaces/user.interface';
import { loginAction } from '../actions/login.action';
import { checkAuthAction } from '../actions/check-auth.action';
import type { AuthLoginRequest, AuthRegisterRequest } from '../interfaces/auth.request';
import { registerAction } from '../actions/register.action';
import { sleep } from '@/lib/sleep';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type AuthState = {
    //   Properties
    user: User | null,
    token: string | null,
    authStatus: AuthStatus,

    // Getters
    isAdmin: () => boolean;

    // Actions
    register: ({ fullname, email, password }: AuthRegisterRequest) => Promise<boolean>,
    login: ({ email, password }: AuthLoginRequest) => Promise<boolean>,
    logout: () => void;
    checkAuthStatus: () => Promise<boolean>

}

export const useAuthStore = create<AuthState>()((set, get) => ({
    user: null,
    token: null,
    authStatus: 'checking',

    // Getters
    isAdmin: () => {
        const roles = get().user?.roles || [];

        return roles.includes('admin');
    },

    // Actions
    register: async ({ fullname, email, password }: AuthRegisterRequest) => {

        try {
            const data = await registerAction({ fullname, email, password });
            localStorage.setItem('token', data.token);

            set({
                user: data.user,
                token: data.token,
                authStatus: 'authenticated'
            })

            return true;
        } catch (error) {

            localStorage.removeItem('token');
            set({
                user: null,
                token: null,
                authStatus: 'not-authenticated'
            })

            return false;
        }
    },
    login: async ({ email, password }: AuthLoginRequest) => {

        try {
            const data = await loginAction({ email, password });
            localStorage.setItem('token', data.token);

            set({
                user: data.user,
                token: data.token,
                authStatus: 'authenticated'
            })

            await sleep();

            return true;

        } catch (error) {
            localStorage.removeItem('token');
            set({
                user: null,
                token: null,
                authStatus: 'not-authenticated'
            })

            return false;
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        set({
            user: null,
            token: null,
            authStatus: 'not-authenticated'
        })
    },
    checkAuthStatus: async () => {

        try {
            const { user, token } = await checkAuthAction();

            set({
                user,
                token,
                authStatus: 'authenticated'
            })

            return true;

        } catch (error) {
            set({
                user: undefined,
                token: undefined,
                authStatus: 'not-authenticated'
            })

            return false;
        }
    }
}));
