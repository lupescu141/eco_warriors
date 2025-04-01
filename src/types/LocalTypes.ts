import { User, UserWithNoPassword } from "./EcoWDBTypes.ts";

type Credentials = Pick<User, "username" | "password">;
type RegisterCredentials = Pick<User, "username" | "password" | "email">;

type AuthContextType = {
  user: UserWithNoPassword | null;
  handleLogin: (credentials: Credentials, callback: () => void) => void;
  handleLogout: () => void;
  handleAutoLogin: () => void;
};

export type { Credentials, RegisterCredentials, AuthContextType };
