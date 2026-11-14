export type JobType = "Internship" | "Full-time" | "Part-time";

export type JobCategory =
  | "All"
  | "Development"
  | "Design"
  | "Marketing"
  | "Business"
  | "Data";

export type Job = {
  id: string;
  company: string;
  companyInitials: string;
  title: string;
  category: Exclude<JobCategory, "All">;
  type: JobType;
  location: string;
  salary: string;
  experience: string;
  posted: string;
  description: string;
  skills: string[];
  color: string;
  featured?: boolean;
  isRemote?: boolean;
};

export const jobCategories: {
  label: Exclude<JobCategory, "All">;
  icon: string;
  color: string;
}[] = [
  { label: "Development", icon: "code-slash-outline", color: "#6366F1" },
  { label: "Design", icon: "color-palette-outline", color: "#EC4899" },
  { label: "Marketing", icon: "megaphone-outline", color: "#0EA5E9" },
  { label: "Business", icon: "briefcase-outline", color: "#F59E0B" },
  { label: "Data", icon: "analytics-outline", color: "#10B981" },
];

export const mockJobs: Job[] = [
  {
    id: "job-1",
    company: "Tech Solutions",
    companyInitials: "TS",
    title: "React Native Developer",
    category: "Development",
    type: "Internship",
    location: "Jaipur, Rajasthan",
    salary: "₹10k–15k / month",
    experience: "Fresher",
    posted: "2 days ago",
    description:
      "Work with our mobile engineering team to build and improve cross-platform applications. You'll get hands-on experience with React Native, TypeScript, and real product development.",
    skills: ["React Native", "JavaScript", "TypeScript"],
    color: "#6366F1",
    featured: true,
  },
  {
    id: "job-2",
    company: "Digital Labs",
    companyInitials: "DL",
    title: "Frontend Developer",
    category: "Development",
    type: "Full-time",
    location: "Jaipur, Rajasthan",
    salary: "₹3–5 LPA",
    experience: "0–1 years",
    posted: "1 day ago",
    description:
      "Join our frontend team and help create responsive web experiences using modern JavaScript frameworks.",
    skills: ["React", "HTML", "CSS"],
    color: "#0EA5E9",
  },
  {
    id: "job-3",
    company: "Creative Studio",
    companyInitials: "CS",
    title: "UI/UX Design Intern",
    category: "Design",
    type: "Internship",
    location: "Remote",
    salary: "₹8k–12k / month",
    experience: "Fresher",
    posted: "3 days ago",
    description:
      "Help design intuitive digital experiences, create wireframes, and collaborate with product teams.",
    skills: ["Figma", "Wireframing", "Prototyping"],
    color: "#EC4899",
    isRemote: true,
  },
  {
    id: "job-4",
    company: "Growth Minds",
    companyInitials: "GM",
    title: "Digital Marketing Associate",
    category: "Marketing",
    type: "Part-time",
    location: "Remote",
    salary: "₹8k–10k / month",
    experience: "Fresher",
    posted: "4 days ago",
    description:
      "Support social media campaigns, content planning, SEO research, and digital growth initiatives.",
    skills: ["SEO", "Social Media", "Content"],
    color: "#F59E0B",
    isRemote: true,
  },
  {
    id: "job-5",
    company: "DataBridge",
    companyInitials: "DB",
    title: "Junior Data Analyst",
    category: "Data",
    type: "Full-time",
    location: "Jaipur, Rajasthan",
    salary: "₹3–4 LPA",
    experience: "0–1 years",
    posted: "5 days ago",
    description:
      "Work with business datasets, build reports, and communicate useful insights to the team.",
    skills: ["Python", "SQL", "Excel"],
    color: "#10B981",
  },
  {
    id: "job-6",
    company: "Startup Hub",
    companyInitials: "SH",
    title: "Business Development Intern",
    category: "Business",
    type: "Internship",
    location: "Jaipur, Rajasthan",
    salary: "₹7k–10k / month",
    experience: "Fresher",
    posted: "6 days ago",
    description:
      "Learn client communication, market research, lead generation, and business development.",
    skills: ["Communication", "Research", "Sales"],
    color: "#F97316",
  },
];
