/* eslint-disable @typescript-eslint/no-loss-of-precision */
require("dotenv").config();
import { FullPost, User, UserWithNoPassword } from "ecwtypes/EcoWDBTypes";
import {
  uploadMediaFile,
  getMediaItems,
  getMediaItem,
  postMediaItem,
  putMediaItem,
  deleteMediaItem,
  getNotFoundMediaItem,
  putNotFoundMediaItem,
  deleteNotFoundMediaItem,
  postInvalidMediaItem,
  putInvalidMediaItem,
  deleteInvalidMediaItem,
  getInvalidMediaItem,
} from "./testMediaItem";
import randomstring from "randomstring";
import { UploadResponse } from "ecwtypes/MessageTypes";
import { loginUser, registerUser } from "./testUser";
import app from "../src/app";
// const app = 'http://localhost:3000';

const authApi = process.env.AUTH_SERVER as string;
const uploadApi = process.env.UPLOAD_SERVER as string;

describe("Media API", () => {
  // test succesful user routes

  // test create user
  let token: string;
  let user: UserWithNoPassword;
  const testUser: Partial<User> = {
    username: "Test_User_" + randomstring.generate(7),
    email: randomstring.generate(9) + "@user.fi",
    password: "asdfQEWR1234",
  };
  it("should create a new user", async () => {
    await registerUser(authApi, "/users", testUser);
  });

  // test login
  it("should return a user object and bearer token on valid credentials", async () => {
    const path = authApi + "/auth/login";
    console.log(path);
    const response = await loginUser(authApi, "/auth/login", {
      username: testUser.username!,
      password: testUser.password!,
    });
    token = response.token;
    user = response.user;
  });

  // test upload media file
  let uploadResponse: UploadResponse;
  it("should upload a media file", async () => {
    const mediaFile = "./test/testfiles/testPic.jpeg";
    uploadResponse = await uploadMediaFile(
      uploadApi,
      "/upload",
      mediaFile,
      token
    );
  });

  // post media file
  it("should post a media file", async () => {
    if (uploadResponse.data) {
      const mediaItem: Partial<FullPost> = {
        post_title: "Test Pic",
        post_description: "A test picture",
        filename: uploadResponse.data.filename,
        filetype: uploadResponse.data.filetype,
        filesize: uploadResponse.data.filesize,
      };
      await postMediaItem(app, "/api/post", token, mediaItem);
    }
  });

  // test succesful media routes
  let mediaItems: FullPost[];
  let testMediaItem: FullPost;
  it("Should get array of media items", async () => {
    mediaItems = await getMediaItems(app);
    console.log(
      "----------------------&&& " +
        JSON.stringify(mediaItems[mediaItems.length - 1])
    );
    testMediaItem = mediaItems[mediaItems.length - 1];
  });

  it("Should get media item by id", async () => {
    const mediaItem = await getMediaItem(app, testMediaItem.post_id);
    expect(mediaItem.post_id).toBe(testMediaItem.post_id);
  });

  it("Should update media item", async () => {
    console.log(
      "---------------------------------------%% " + testMediaItem.post_id
    );
    const updatedItem: Omit<FullPost, "post_id" | "thumbnail" | "created_at"> =
      {
        post_title: "Updated Test Title",
        post_description: "Updated test description",
        filename: testMediaItem.filename,
        filetype: testMediaItem.filetype,
        filesize: testMediaItem.filesize,
        user_id: testMediaItem.user_id,
        file_id: testMediaItem.file_id,
        likes: testMediaItem.likes,
      };
    await putMediaItem(app, testMediaItem.post_id, token, updatedItem);
  });

  it("Should delete media item", async () => {
    await deleteMediaItem(app, testMediaItem.post_id, token);
  });

  // test 404 error mediaItem routes
  it("Should return 404 when getting non-existent media item", async () => {
    await getNotFoundMediaItem(app, 999999);
  });

  it("Should return 404 when updating non-existent media item", async () => {
    await putNotFoundMediaItem(app, 999999, token, "Test media");
  });

  it("Should return 404 when deleting non-existent media item", async () => {
    await deleteNotFoundMediaItem(app, 999999, token);
  });

  // test 400 error mediaItem routes with invalid data
  it("Should return 400 when posting invalid media item", async () => {
    await postInvalidMediaItem(app, token, "");
  });

  it("Should return 400 when updating with invalid media item data", async () => {
    await putInvalidMediaItem(app, "invalid-id", token, "");
  });

  it("Should return 400 when deleting with invalid media id", async () => {
    await deleteInvalidMediaItem(app, "invalid-id", token);
  });

  it("Should return 400 when getting media with invalid id", async () => {
    await getInvalidMediaItem(app, "invalid-id");
  });
});
