export type User = {
  user_id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date | string;
};

export type UserWithNoPassword = Omit<User, "password">;

// check TokenContent and edit this
export type TokenContent = Pick<User, "user_id">;

// profile_img temporarily in UserStats
export type UserStats = {
  user_score: number;
  user_level: number;
  profile_img: string;
};

// Admin and EventOrganizer has no use curently
export type Admin = {
  admin_id: number;
  username: string;
  email: string;
  password: string;
};

export type EventOrganizer = {
  organizer_id: number;
  username: string;
  email: string;
  password: string;
};

// NO server for posting exist yeat
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

// will be implemented later
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

export type MediaItemWithOwner = Posts & Pick<User, "username">;

export type TagResult = MediaItemTag & Tag;
