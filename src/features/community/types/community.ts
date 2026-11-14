export type CommunityCategory =
  | "Discussion"
  | "Question"
  | "Project"
  | "Event"
  | "Campus Life";

export type CommunityPost = {
  id: string;
  author: string;
  initials: string;
  college: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  avatarColor: string;
  category: CommunityCategory;
  verified?: boolean;
  isLiked?: boolean;
  isBookmarked?: boolean;
};

export type CommunityComment = {
  id: string;
  postId: string;
  author: string;
  initials: string;
  college: string;
  content: string;
  time: string;
  avatarColor: string;
};
