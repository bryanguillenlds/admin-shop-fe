import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { AuthStatus, type User } from '@/modules/auth/interfaces';
import { checkAuthAction, loginAction, registerAction } from '../../actions';
import { useLocalStorage } from '@vueuse/core';


export const useAuthStore = defineStore('auth', () => {

  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));
  const authStatus = ref<AuthStatus>(AuthStatus.CHECKING);

  const register = async (fullName: string, email: string, password: string) => {
    try {
      const registerResponse = await registerAction(fullName, email, password);

      if (!registerResponse.ok) {
        authStatus.value = AuthStatus.UNAUTHENTICATED;

        logout();

        return {
          ok: false,
          message: registerResponse.message
        }
      }

      user.value = registerResponse.user;
      token.value = registerResponse.token;
      authStatus.value = AuthStatus.AUTHENTICATED;

      return true;
    } catch (error) {
      console.error(error);

      return {
        ok: false,
        message: 'Error registering user',
      }
    }
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResponse = await checkAuthAction();

      if(!statusResponse.ok) {
        logout();

        return false;
      }

      user.value = statusResponse.user;
      token.value = statusResponse.token;
      authStatus.value = AuthStatus.AUTHENTICATED;

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await loginAction(email, password);

      if (!loginResponse.ok) {
        authStatus.value = AuthStatus.UNAUTHENTICATED;

        return logout();
      }

      user.value = loginResponse.user;
      token.value = loginResponse.token;
      authStatus.value = AuthStatus.AUTHENTICATED;

      return true;
    } catch (error) {
      console.error(error);

      return logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');

    user.value = undefined;
    token.value = '';
    authStatus.value = AuthStatus.UNAUTHENTICATED;

    return false;
  };

  return {
    user,
    token,
    authStatus,

    //Getters
    isChecking: computed(() => authStatus.value === AuthStatus.CHECKING),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.AUTHENTICATED),
    isNotAuthenticated: computed(() => authStatus.value === AuthStatus.UNAUTHENTICATED),
    isAdmin: computed(() => user.value?.roles.includes('admin')),
    username: computed(() => user.value?.fullName),

    //Actions
    register,
    login,
    logout,
    checkAuthStatus,
   }
})