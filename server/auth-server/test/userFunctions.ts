import { Express } from "express";
import request from "supertest";
import { User, UserWithNoPassword } from "ecwtypes/EcoWDBTypes";
import {
  UserResponse,
  LoginResponse,
  MessageResponse,
} from "ecwtypes/MessageTypes";

const createUser = (
  url: string | Express,
  path: string,
  user: Pick<User, "username" | "email" | "password">
): Promise<UserWithNoPassword> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post(path)
      .send(user)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const result: UserResponse = response.body;
          expect(result).toHaveProperty("message");
          expect(result).toHaveProperty("user");
          if (!result.user) {
            reject(new Error("User not created"));
          }
          const userData = result.user as UserWithNoPassword;
          expect(userData.user_id).toBeGreaterThan(0);
          expect(userData.username).toBe(user.username);
          expect(userData.email).toBe(user.email.toLowerCase());
          expect(userData.created_at).toBeDefined();
          resolve(userData);
        }
      });
  });
};

const getAllUsers = (
  url: string | Express,
  path: string
): Promise<UserWithNoPassword[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(path)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const users: UserWithNoPassword[] = response.body;
          users.forEach((user) => {
            expect(user).toHaveProperty("user_id");
            expect(user).toHaveProperty("username");
            expect(user).toHaveProperty("email");
            expect(user).toHaveProperty("created_at");
          });
          resolve(users);
        }
      });
  });
};

const getSingleUser = (
  url: string | Express,
  path: string,
  id: number
): Promise<UserWithNoPassword> => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`${path}/${id}`)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const user: UserWithNoPassword = response.body;
          expect(user.user_id).toBe(id);
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("email");
          expect(user).toHaveProperty("created_at");
          resolve(user);
        }
      });
  });
};

const getSingleUserError = (
  url: string | Express,
  path: string,
  id: number
) => {
  return new Promise((resolve, reject) => {
    request(url)
      .get(`${path}/${id}`)
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const result: MessageResponse = response.body;
          expect(result).toHaveProperty("message");
          expect(result.message).toBe("User not found");
          resolve(result);
        }
      });
  });
};

const login = (
  url: string | Express,
  path: string,
  user: Pick<User, "username" | "password">
): Promise<string> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post(path)
      .send(user)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const result: LoginResponse = response.body;
          expect(result).toHaveProperty("message");
          expect(result).toHaveProperty("user");
          expect(result).toHaveProperty("token");
          if (!result.user) {
            reject(new Error("User not created"));
          }
          const userData = result.user as UserWithNoPassword;
          expect(userData.user_id).toBeGreaterThan(0);
          expect(userData.username).toBe(user.username);
          expect(userData.email).toBeDefined();
          expect(userData.created_at).toBeDefined();
          resolve(result.token);
        }
      });
  });
};

const modifyUser = (
  url: string | Express,
  path: string,
  token: string,
  user: Pick<User, "username" | "email">
) => {
  return new Promise((resolve, reject) => {
    request(url)
      .put(path)
      .set("Authorization", token)
      .send(user)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const result: UserResponse = response.body;
          expect(result).toHaveProperty("message");
          expect(result).toHaveProperty("user");
          if (!result.user) {
            reject(new Error("User not created"));
          }
          const userData = result.user as UserWithNoPassword;
          expect(userData.user_id).toBeGreaterThan(0);
          expect(userData.username).toBe(user.username);
          expect(userData.email).toBe(user.email.toLowerCase());
          expect(userData.created_at).toBeDefined();
          resolve(userData);
        }
      });
  });
};

const deleteUser = (url: string | Express, path: string, token: string) => {
  return new Promise((resolve, reject) => {
    request(url)
      .delete(path)
      .set("Authorization", token)
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const result: UserResponse = response.body;
          expect(result).toHaveProperty("message");
          expect(result).toHaveProperty("user");
          const userData = result.user as User;
          expect(userData.user_id).toBeGreaterThan(0);
          resolve(userData);
        }
      });
  });
};

export {
  getAllUsers,
  getSingleUser,
  getSingleUserError,
  createUser,
  login,
  modifyUser,
  deleteUser,
};
