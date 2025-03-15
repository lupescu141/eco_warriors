export type Users = {
  user_id: number;
  username: string;
  email: string;
  password: string;
  profile_img: string;
  user_score: number;
  user_level: number;
  created_at: Date | string;
};

export type admin = {
  admin_id: number;
  username: string;
  email: string;
  password: string;
};

export type eventOrganizer = {
  organizer_id: number;
  username: string;
  email: string;
  password: string;
};

export type Posts = {
  id: number;
  post_title: string;
  post_description: string;
  likes: number;
  username: string;
};

export type PostImages = {
  id: number;
  filename: string;
  post_id: number;
};

export type Comments = {
  id: number;
  username: string;
  comment: string;
  post_id: number;
};

export type Top10 = {
  id: number;
  position: number;
  username: string;
};

// Not implemented yeat
export type Tag = {
  tag_id: number;
  tag_name: string;
};

export type MediaItemTag = {
  media_id: number;
  tag_id: number;
};

// Temporarry will delete later
export type UserLevel = {
  level_id: number;
  level_name: "Admin" | "User" | "Guest";
};

export type UserWithLevel = Omit<Users, "user_level_id"> &
  Pick<UserLevel, "level_name">;

export type UserWithNoPassword = Omit<UserWithLevel, "password">;

export type TokenContent = Pick<Users, "user_id"> &
  Pick<UserLevel, "level_name">;

export type MediaItemWithOwner = Posts & Pick<Users, "username">;

export type TagResult = MediaItemTag & Tag;
