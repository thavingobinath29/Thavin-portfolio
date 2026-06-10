export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  isFuture?: boolean;
}

export const timelineItems: TimelineItem[] = [
  {
    year: "2023",
    title: "Started B.Tech AI & Data Science",
    description: "Began academic journey in B.Tech Artificial Intelligence and Data Science (2023 - 2027) in Tamil Nadu, learning core computing, math, and database concepts."
  },
  {
    year: "2024",
    title: "UI/UX Design Projects & NPTEL Certifications",
    description: "Discovered passion for building interfaces. Completed multiple Figma projects, along with elite IIT certification courses in Java and Cloud Computing."
  },
  {
    year: "2025",
    title: "Built Info-Hub Platform",
    description: "Architected and implemented Info-Hub, a centralized web dashboard to search and aggregate college events, scholarships, and career paths."
  },
  {
    year: "2026",
    title: "Developed Real Estate Dashboard",
    description: "Built an intelligent location-based dashboard with custom recommendation engines and filters to suggest property investments."
  },
  {
    year: "Future",
    title: "Software Engineer at a Product Company",
    description: "Striving to build elegant, scale-resilient software and AI-driven solutions alongside world-class development teams.",
    isFuture: true
  }
];
