import { AdminWithNoPassword, UserWithNoPassword } from "./EcoWDBTypes";
import { FullPost } from "./EcoWDBTypes";

type MessageResponse = {
  message: string;
};

type ErrorResponse = MessageResponse & {
  stack?: string;
};

// for auth server
type LoginResponse = MessageResponse & {
  token: string;
  message: string;
  user: UserWithNoPassword;
  admin?: AdminWithNoPassword;
};

type UserResponse = MessageResponse & {
  user: UserWithNoPassword;
};

type UserDeleteResponse = MessageResponse & {
  user: { user_id: number };
};

type AvailableResponse = Partial<MessageResponse> & {
  available?: boolean;
};

type BooleanResponse = MessageResponse & {
  success: boolean;
};

// for upload and post server
type UploadResponse = MessageResponse & {
  data: {
    filename: string;
    filetype: string;
    filesize: number;
    screenshots?: string[];
  };
};

type MediaResponse = MessageResponse & {
  media: FullPost;
};

type Pfresposne = MessageResponse & {
  origin: string;
  filename: string;
};

export type {
  MessageResponse,
  MediaResponse,
  ErrorResponse,
  LoginResponse,
  UploadResponse,
  UserResponse,
  UserDeleteResponse,
  AvailableResponse,
  BooleanResponse,
  Pfresposne,
};
