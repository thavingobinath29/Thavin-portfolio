export interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  stack: string[];
  links: {
    demo?: string;
    github?: string;
    caseStudy?: string;
  };
}

export const projects: Project[] = [
  {
    id: "info-hub",
    title: "Info-Hub",
    description: "Centralized college discovery platform that aggregates events, scholarships, and career guidance for students.",
    features: [
      "College Discovery",
      "Scholarship Finder",
      "Event Aggregation",
      "Career Guidance"
    ],
    stack: ["React.js", "Python", "SQL"],
    links: {
      demo: "https://infohub-demo.example.com",
      github: "https://github.com/thavin/info-hub",
      caseStudy: "#"
    }
  },
  {
    id: "real-estate",
    title: "Real Estate Dashboard",
    description: "Intelligent real estate platform with smart recommendations, personalized filtering, and location-based insights.",
    features: [
      "Nearby Property Search",
      "Smart Recommendations",
      "Location Insights",
      "Personalized Filtering"
    ],
    stack: ["React.js", "Node.js", "MongoDB"],
    links: {
      demo: "https://realestate-demo.example.com",
      github: "https://github.com/thavin/real-estate"
    }
  }
];
