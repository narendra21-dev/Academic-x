import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { INITIAL_COMMUNITY_POSTS } from "@/features/community/data/mock-posts";
import type {
  CommunityCategory,
  CommunityComment,
  CommunityPost,
} from "@/features/community/types/community";

type NewPost = {
  content: string;
  category: CommunityCategory;
};

type CommunityContextValue = {
  posts: CommunityPost[];
  commentsByPost: Record<string, CommunityComment[]>;
  addPost: (post: NewPost) => void;
  toggleLike: (postId: string) => void;
  toggleBookmark: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
};

const CommunityContext = createContext<CommunityContextValue | null>(null);

type Props = {
  children: ReactNode;
};

export function CommunityProvider({ children }: Props) {
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);

  const [commentsByPost, setCommentsByPost] = useState<
    Record<string, CommunityComment[]>
  >({});

  const toggleLike = useCallback((postId: string) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) return post;

        const isLiked = !post.isLiked;

        return {
          ...post,
          isLiked,
          likes: Math.max(0, post.likes + (isLiked ? 1 : -1)),
        };
      }),
    );
  }, []);

  const toggleBookmark = useCallback((postId: string) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post,
      ),
    );
  }, []);

  const addPost = useCallback(({ content, category }: NewPost) => {
    const trimmedContent = content.trim();
    if (!trimmedContent) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: "You",
      initials: "YO",
      college: "Your community",
      time: "Just now",
      content: trimmedContent,
      likes: 0,
      comments: 0,
      avatarColor: "#E0E7FF",
      category,
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
  }, []);

  const addComment = useCallback((postId: string, content: string) => {
    const trimmedContent = content.trim();
    if (!trimmedContent) return;

    const newComment: CommunityComment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      postId,
      author: "You",
      initials: "YO",
      college: "Your community",
      content: trimmedContent,
      time: "Just now",
      avatarColor: "#E0E7FF",
    };

    setCommentsByPost((current) => ({
      ...current,
      [postId]: [...(current[postId] ?? []), newComment],
    }));

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId ? { ...post, comments: post.comments + 1 } : post,
      ),
    );
  }, []);

  const value = useMemo(
    () => ({
      posts,
      commentsByPost,
      addPost,
      toggleLike,
      toggleBookmark,
      addComment,
    }),
    [posts, commentsByPost, addPost, toggleLike, toggleBookmark, addComment],
  );

  return (
    <CommunityContext.Provider value={value}>
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const context = useContext(CommunityContext);

  if (!context) {
    throw new Error("useCommunity must be used inside CommunityProvider");
  }

  return context;
}
