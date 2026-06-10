export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["React.js", "JavaScript", "HTML", "CSS"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "Python", "SQL", "MongoDB"]
  },
  {
    category: "Languages",
    skills: ["Java", "C"]
  },
  {
    category: "AI / ML",
    skills: ["Data Science", "AI Systems"]
  },
  {
    category: "Design",
    skills: ["Figma", "UI/UX Design", "Canva"]
  },
  {
    category: "Dev Tools",
    skills: ["GitHub", "VS Code", "Vercel"]
  }
];
