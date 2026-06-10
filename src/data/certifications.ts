export interface Certification {
  id: string;
  name: string;
  issuer: string;
  badge: {
    text: string;
    type: "elite" | "completed";
  };
  icon: string;
  previewUrl: string; // fallback preview image or template
}

export const certifications: Certification[] = [
  {
    id: "nptel-java",
    name: "Java Programming",
    issuer: "IIT via NPTEL",
    badge: {
      text: "Elite",
      type: "elite"
    },
    icon: "☕",
    previewUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "nptel-cloud",
    name: "Cloud Computing",
    issuer: "IIT via NPTEL",
    badge: {
      text: "Elite",
      type: "elite"
    },
    icon: "☁️",
    previewUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "infosys-ai",
    name: "Artificial Intelligence",
    issuer: "Infosys Springboard",
    badge: {
      text: "Completed",
      type: "completed"
    },
    icon: "🤖",
    previewUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop"
  }
];
