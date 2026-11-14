export type CourseCategory =
  | "All"
  | "Development"
  | "Design"
  | "Business"
  | "Data Science"
  | "Marketing";

export type Course = {
  id: string;
  title: string;
  instructor: string;
  category: Exclude<CourseCategory, "All">;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  students: string;
  duration: string;
  lessons: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  icon: string;
  color: string;
  isFeatured?: boolean;
  isFree?: boolean;
};

export const courseCategories: {
  label: Exclude<CourseCategory, "All">;
  icon: string;
  color: string;
}[] = [
  { label: "Development", icon: "code-slash-outline", color: "#6366F1" },
  { label: "Design", icon: "color-palette-outline", color: "#EC4899" },
  { label: "Business", icon: "briefcase-outline", color: "#F59E0B" },
  { label: "Data Science", icon: "bar-chart-outline", color: "#10B981" },
  { label: "Marketing", icon: "megaphone-outline", color: "#0EA5E9" },
];

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete React Native Masterclass",
    instructor: "Rahul Sharma",
    category: "Development",
    description:
      "Learn to build beautiful cross-platform mobile applications from scratch.",
    price: 499,
    originalPrice: 999,
    rating: 4.8,
    students: "1.2k",
    duration: "18 hours",
    lessons: 86,
    level: "Beginner",
    icon: "phone-portrait-outline",
    color: "#6366F1",
    isFeatured: true,
  },
  {
    id: "2",
    title: "UI/UX Design Fundamentals",
    instructor: "Priya Mehta",
    category: "Design",
    description:
      "Master user research, wireframing, and modern interface design.",
    price: 299,
    originalPrice: 599,
    rating: 4.7,
    students: "850",
    duration: "12 hours",
    lessons: 54,
    level: "Beginner",
    icon: "color-palette-outline",
    color: "#EC4899",
  },
  {
    id: "3",
    title: "Python for Data Science",
    instructor: "Aman Verma",
    category: "Data Science",
    description: "Explore Python, data analysis, and practical data projects.",
    price: 599,
    originalPrice: 1199,
    rating: 4.9,
    students: "2.1k",
    duration: "22 hours",
    lessons: 102,
    level: "Intermediate",
    icon: "analytics-outline",
    color: "#10B981",
  },
  {
    id: "4",
    title: "Business & Entrepreneurship",
    instructor: "Neha Kapoor",
    category: "Business",
    description:
      "Understand business models, strategy, and startup fundamentals.",
    price: 0,
    originalPrice: 0,
    rating: 4.6,
    students: "640",
    duration: "8 hours",
    lessons: 32,
    level: "Beginner",
    icon: "briefcase-outline",
    color: "#F59E0B",
    isFree: true,
  },
  {
    id: "5",
    title: "Digital Marketing Essentials",
    instructor: "Karan Singh",
    category: "Marketing",
    description: "Learn SEO, social media marketing, and campaign strategy.",
    price: 399,
    originalPrice: 799,
    rating: 4.7,
    students: "970",
    duration: "10 hours",
    lessons: 46,
    level: "Beginner",
    icon: "megaphone-outline",
    color: "#0EA5E9",
  },
];
