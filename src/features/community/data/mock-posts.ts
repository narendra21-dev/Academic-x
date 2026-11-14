// src/features/community/data/mock-posts.ts

import type { CommunityPost } from "../types/community";

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "post-1",
    author: "Rahul Sharma",
    initials: "RS",
    college: "University Student",
    time: "2 hours ago",
    content:
      "Completed my React Native project! Excited to share my learning journey with everyone.",
    likes: 24,
    comments: 8,
    avatarColor: "#DBEAFE",
    category: "Project",
    verified: true,
  },
  {
    id: "post-2",
    author: "Priya Verma",
    initials: "PV",
    college: "Computer Science Student",
    time: "3 hours ago",
    content:
      "What are your favourite resources for learning data structures and algorithms? I am preparing for placement interviews and would love some recommendations.",
    likes: 18,
    comments: 12,
    avatarColor: "#FCE7F3",
    category: "Question",
  },
  {
    id: "post-3",
    author: "Aman Singh",
    initials: "AS",
    college: "Engineering Student",
    time: "5 hours ago",
    content:
      "Consistency matters more than motivation. Try to spend at least one hour every day building something practical.",
    likes: 32,
    comments: 6,
    avatarColor: "#FEF3C7",
    category: "Discussion",
  },
  {
    id: "post-4",
    author: "Neha Sharma",
    initials: "NS",
    college: "University Student",
    time: "Yesterday",
    content:
      "Our college tech fest is coming soon! Looking forward to meeting other developers and sharing ideas.",
    likes: 41,
    comments: 9,
    avatarColor: "#D1FAE5",
    category: "Event",
    verified: true,
  },
  {
    id: "post-5",
    author: "Karan Mehta",
    initials: "KM",
    college: "Design Student",
    time: "Yesterday",
    content:
      "Sharing some campus moments from this week. College life is full of opportunities to learn beyond the classroom.",
    likes: 15,
    comments: 4,
    avatarColor: "#EDE9FE",
    category: "Campus Life",
  },
];
