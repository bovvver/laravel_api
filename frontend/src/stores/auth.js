import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { csrfCookie, login, register, logout, getUser } from "../http/auth-api";

export const useAuthStore = defineStore("authStore", () => {
  const user = ref(null);
  const loginErrors = reactive({
    email: "",
    password: "",
  });
  const registerErrors = reactive({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const isLoggedIn = computed(() => !!user.value);

  const fetchUser = async () => {
    try {
      const { data } = await getUser();
      user.value = data;
    } catch (error) {
      user.value = null;
    }
  };

  const handleLogin = async (credentials) => {
    await csrfCookie();

    try {
      await login(credentials);
      await fetchUser();
      loginErrors.value = {};
    } catch (error) {
      const responseData = error.response.data.errors;

      if (error.response && error.response.status === 422) {
        loginErrors.email = responseData.email;
        loginErrors.password = responseData.password;
      }
    }
  };

  const handleRegister = async (newUser) => {
    await csrfCookie();

    try {
      await register(newUser);
      await handleLogin({
        email: newUser.email,
        password: newUser.password,
      });
      registerErrors.value = {};
    } catch (error) {
      const responseData = error.response.data.errors;

      if (error.response && error.response.status === 422) {
        registerErrors.name = responseData.name;
        registerErrors.email = responseData.email;
        registerErrors.password = responseData.password;
        registerErrors.password_confirmation =
          responseData.password_confirmation;
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    user.value = null;
  };

  return {
    user,
    loginErrors,
    registerErrors,
    isLoggedIn,
    fetchUser,
    handleLogin,
    handleRegister,
    handleLogout,
  };
});
