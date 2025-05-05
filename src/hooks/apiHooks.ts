import { fetchData } from "../lib/functions";
import { useEffect, useState } from 'react';
import { Credentials, RegisterCredentials } from "../types/LocalTypes.ts";
import {
  AvailableResponse,
  LoginResponse,
  UserResponse,
} from "../types/MessageTypes.ts";

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

//Leaderboard
export interface Player {
  id: number;
  name: string;
  points: number;
  avatar: string;
}

export const useTop100 = () => {
  const [top100, setTop100] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTop100 = async () => {
      try {
        const players: Player[] = await fetchData(
          import.meta.env.VITE_DB_API + '/leaderboard/top100'
        );
        setTop100(players);
      } catch (err) {
        console.error('Failed to fetch top 100:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTop100();
  }, []);

  return { top100, loading };
};

export const useTop10 = () => {
  const [top10, setTop10] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTop10 = async () => {
      try {
        const players: Player[] = await fetchData(
          import.meta.env.VITE_DB_API + '/leaderboard/top10'
        );
        setTop10(players);
      } catch (err) {
        console.error('Failed to fetch top 10:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTop10();
  }, []);

  return { top10, loading };
};