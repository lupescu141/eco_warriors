import {
  Comments,
  FullPost,
  MediaItemWithOwner,
  UserWithNoPassword,
} from "ecwtypes/EcoWDBTypes";
import { fetchData } from "../lib/functions";
import { Credentials, RegisterCredentials } from "ecwtypes/LocalTypes.ts";
import {
  AvailableResponse,
  LoginResponse,
  MessageResponse,
  UploadResponse,
  UserResponse,
} from "ecwtypes/MessageTypes.ts";
import { useEffect, useState } from "react";

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
  const getUserById = async (id: number) => {
    return await fetchData<UserWithNoPassword>(
      import.meta.env.VITE_AUTH_API + "/users/" + id
    );
  };

  return {
    postRegister,
    getUserByToken,
    getUsernameAvailable,
    getEmailAvailable,
    getUserById,
  };
};
export { useUser };

const usePost = () => {
  const [postArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);
  useEffect(() => {
    const getPost = async () => {
      try {
        // kaikki mediat ilman omistajan tietoja
        const media = await fetchData<FullPost[]>(
          import.meta.env.VITE_POST_API + "/post"
        );
        // haetaan omistajat id:n perusteella
        const mediaWithOwner: MediaItemWithOwner[] = await Promise.all(
          media.map(async (item) => {
            const owner = await fetchData<UserWithNoPassword>(
              import.meta.env.VITE_AUTH_API + "/users/" + item.user_id
            );

            const mediaItem: MediaItemWithOwner = {
              ...item,
              username: owner.username,
            };
            return mediaItem;
          })
        );

        console.log(mediaWithOwner);

        setMediaArray(mediaWithOwner);
      } catch (error) {
        console.error((error as Error).message);
      }
    };

    getPost();
  }, []);

  const newPost = async (
    file: UploadResponse,
    inputs: Record<string, string>,
    token: string
  ) => {
    const item: Omit<
      FullPost,
      | "post_id"
      | "user_id"
      | "thumbnail"
      | "screenshots"
      | "created_at"
      | "likes"
    > = {
      post_title: inputs.title,
      post_description: inputs.description,
      filename: file.data.filename,
      filetype: file.data.filetype,
      filesize: file.data.filesize,
    };
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    };
    return await fetchData<MessageResponse>(
      import.meta.env.VITE_POST_API + "/post",
      options
    );
  };
  return { postArray, newPost };
};

const useFile = () => {
  const postFile = async (file: File, token: string) => {
    const formData = new FormData();
    formData.append("file", file);
    const options = {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      body: formData,
    };
    return await fetchData<UploadResponse>(
      import.meta.env.VITE_UPLOAD_API + "/upload",
      options
    );
  };
  return { postFile };
};

// COMMENTS

const useComment = () => {
  const { getUserById } = useUser();

  // lähetä kommentti
  const postComment = async (
    comment_text: string,
    media_id: number,
    token: string
  ) => {
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ media_id, comment_text }),
    };
    // return the data
    return await fetchData<MessageResponse>(
      import.meta.env.VITE_MEDIA_API + "/comments",
      options
    );
  };

  const getCommentsByMediaId = async (post_id: number) => {
    // Send a GET request to /comments/bymedia/:media_id to get the comments.
    const comments = await fetchData<Comments[]>(
      import.meta.env.VITE_MEDIA_API + "/comments/bypost/" + post_id
    );
    // // Send a GET request to auth api and add username to all comments
    // const commentsWithUsername = await Promise.all<
    //   Comment & { username: string }
    // >(
    //   comments.map(async (comment) => {
    //     const user = await getUserById(comment.user_id);
    //     return { ...comment, username: user.username};
    //   })
    // );
    // return commentsWithUsername;
    return comments;
  };

  // kommenttien määrä
  const getCommentCountByMediaId = async (id: number) => {
    return await fetchData<{ count: number }>(
      import.meta.env.VITE_MEDIA_API + "/comments/count/" + id
    );
  };

  return { postComment, getCommentsByMediaId, getCommentCountByMediaId };
};

export { usePost, useFile, useComment };
