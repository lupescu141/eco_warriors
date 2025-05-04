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

export type ProfilePic = {
  user_id: number;
  filename: string;
  filesize: number;
  filetype: string;
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
export type FullPost = {
  post_id: number;
  post_title: string;
  post_description: string;
  user_id: number;
  filename: string;
  filesize: number;
  filetype: string;
  thumbnail: string;
  likes: number;
  created_at: Date | string;
};

export type Comments = {
  comment_id: number;
  user_id: string;
  comment: string;
  post_id: number;
  created_at: Date;
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

export type PostItemTag = {
  post_id: number;
  tag_id: number;
};

export type MediaItemWithOwner = FullPost & Pick<User, "username">;

export type TagResult = PostItemTag & Tag;

export type Comment = {
  comment_id: number;
  post_id: number;
  user_id: number;
  text: string;
};

export type Likes = {
  like_id: number;
  post_id: number;
  user_id: number;
  created_at: Date;
};

export type Tasks = {
  task_id: number;
  task_title: string;
  task_description: string;
  points: number;
  level: number;
  month: number;
  year: number;
};

export type UserTask = {
  task_id: number;
  user_id: number;
  complete: boolean;
  active: boolean;
};
