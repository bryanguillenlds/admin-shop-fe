import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { AuthStatus, type User } from '@/modules/auth/interfaces';
import { loginAction, registerAction } from '../../actions';
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

    username: computed(() => user.value?.fullName),

    //Actions
    register,
    login,
    logout,
   }
})