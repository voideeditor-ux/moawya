export type Category = "All" | "Commercial" | "Documentary" | "Social Media" | "Music Video";

export interface Project {
  id: string;
  title: string;
  client: string;
  category: Exclude<Category, "All">;
  year: number;
  duration: string;
  thumbnail: string;
  videoUrl: string | null;
  description: string;
  featured?: boolean;
}

export const categories: Category[] = [
  "All",
  "Commercial",
  "Documentary",
  "Social Media",
  "Music Video",
];

export const projects: Project[] = [
  {
    id: "1",
    title: "The Quiet Hours",
    client: "Nescafé",
    category: "Commercial",
    year: 2024,
    duration: "1:30",
    thumbnail: "",
    videoUrl: "https://player.vimeo.com/video/1199945169",
    description: "A cinematic commercial exploring morning rituals and the comfort of a first cup.",
    featured: true,
  },
  {
    id: "2",
    title: "Roots & Routes",
    client: "Al Jazeera",
    category: "Documentary",
    year: 2024,
    duration: "24:00",
    thumbnail: "",
    videoUrl: null,
    description: "A feature documentary following three families across the MENA region.",
    featured: true,
  },
  {
    id: "3",
    title: "Pulse",
    client: "Nike",
    category: "Commercial",
    year: 2023,
    duration: "0:45",
    thumbnail: "",
    videoUrl: null,
    description: "High-energy sports commercial cut to a custom electronic score.",
  },
  {
    id: "4",
    title: "Cairo at Midnight",
    client: "Self-directed",
    category: "Documentary",
    year: 2023,
    duration: "8:00",
    thumbnail: "",
    videoUrl: null,
    description: "A short observational film about Cairo's nocturnal street life.",
  },
  {
    id: "5",
    title: "Orbit",
    client: "DJ Karim",
    category: "Music Video",
    year: 2024,
    duration: "3:45",
    thumbnail: "",
    videoUrl: null,
    description: "A hypnotic visual journey through light and space paired with an ambient electronic track.",
    featured: true,
  },
  {
    id: "6",
    title: "Ramadan Campaign",
    client: "Vodafone Egypt",
    category: "Social Media",
    year: 2024,
    duration: "0:30",
    thumbnail: "",
    videoUrl: null,
    description: "A series of 30-second social spots celebrating connection during Ramadan.",
  },
  {
    id: "7",
    title: "Beyond the Frame",
    client: "Canon Middle East",
    category: "Commercial",
    year: 2023,
    duration: "2:00",
    thumbnail: "",
    videoUrl: null,
    description: "Brand film showcasing the creative vision of photographers using Canon mirrorless.",
  },
  {
    id: "8",
    title: "Echoes",
    client: "Nour Hassan",
    category: "Music Video",
    year: 2023,
    duration: "4:10",
    thumbnail: "",
    videoUrl: null,
    description: "A melancholic narrative music video shot in black and white across Alexandria.",
  },
];
