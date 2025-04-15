import { fetchData } from "../lib/functions";
import { Credentials, RegisterCredentials } from "ecwtypes/LocalTypes.ts";
import {
  AvailableResponse,
  LoginResponse,
  UserResponse,
} from "ecwtypes/MessageTypes.ts";

// AUTENTIKOINTI

const useAuthentication = () => {
  // Log in
  const postLogin = async (credentials: Credentials) => {
    const options = {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    };
    try {
      return await fetchData<LoginResponse>(
        import.meta.env.VITE_AUTH_API + "/auth/login",
        options
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return { postLogin };
};

export { useAuthentication };

// USER

const useUser = () => {
  // register
  const postRegister = async (credentials: RegisterCredentials) => {
    const options = {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    };
    console.log(credentials);
    try {
      return await fetchData<LoginResponse>(
        import.meta.env.VITE_AUTH_API + "/users",
        options
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  const getUserByToken = async (token: string) => {
    const options = {
      headers: { Authorization: "Bearer " + token },
    };
    return await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + "/users/token",
      options
    );
  };

  const getUsernameAvailable = async (username: string) => {
    // fetch from endpoint /users/username/:username
    const tulos: AvailableResponse = await fetchData(
      import.meta.env.VITE_AUTH_API + "/users/username/" + username
    );
    return tulos;
  };

  const getEmailAvailable = async (email: string) => {
    const tulos: AvailableResponse = await fetchData(
      import.meta.env.VITE_AUTH_API + "/users/email/" + email
    );
    return tulos;
  };

  return {
    postRegister,
    getUserByToken,
    getUsernameAvailable,
    getEmailAvailable,
  };
};
export { useUser };
