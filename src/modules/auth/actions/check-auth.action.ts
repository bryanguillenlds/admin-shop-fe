import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse, User } from "../interfaces";
import { isAxiosError } from "axios";

interface CheckAuthError {
  ok: false;
}

interface CheckAuthSuccess {
  ok: true;
  user: User;
  token: string;
}


export const checkAuthAction = async (): Promise<CheckAuthSuccess | CheckAuthError> => {
  try {
    const token = localStorage.getItem('token');

    if (token && token.length < 10) {
      return {
        ok: false
      }
    }

    const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');

    return {
      ok: true,
      user: data.user,
      token: data.token,
    }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false
      }
    }

    console.error(error);
    throw new Error('Failed to check authentication status');
  }
};