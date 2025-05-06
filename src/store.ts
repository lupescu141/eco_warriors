import { Comment } from "ecwtypes/EcoWDBTypes";
import { create } from "zustand";

type CommentStore = {
  comments: Partial<Comment & { username: string }>[];
  setComments: (comment: Partial<Comment & { username: string }>[]) => void;
  addComment: (comment: Partial<Comment & { username: string }>) => void;
};

export const useCommentStore = create<CommentStore>((set) => ({
  comments: [],
  setComments: (comments) =>
    set(() => ({
      comments: comments,
    })),
  addComment: (comment) =>
    set((state) => ({
      comments: [
        ...state.comments,
        {
          comment_id: state.comments.length + 1,
          comment: comment.comment || "",
          user_id: comment.user_id,
          post_id: comment.post_id,
          created_at: new Date().toISOString(),
          profile: comment.profile,
          username: comment.username,
        },
      ],
    })),
}));
