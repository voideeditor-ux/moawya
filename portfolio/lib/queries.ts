import { client } from "./sanity";

export interface SanityProject {
  _id: string;
  title: string;
  client: string;
  category: "Commercial" | "Documentary" | "Social Media" | "Music Video";
  year: number;
  duration: string;
  videoUrl: string | null;
  thumbnail: { asset: { _ref: string } } | null;
  description: string;
  featured?: boolean;
  order?: number;
}

export interface SanityStat {
  value: string;
  label: string;
}

export interface SanitySocial {
  label: string;
  url: string;
}

export interface SanitySettings {
  name: string;
  tagline: string;
  bio: unknown[] | null;
  photo: { asset: { _ref: string } } | null;
  email: string;
  location: string;
  stats: SanityStat[];
  tools: string[];
  socials: SanitySocial[];
  showreelUrl: string | null;
}

export async function getProjects(): Promise<SanityProject[]> {
  return client.fetch(
    `*[_type == "project"] | order(order asc, _createdAt desc) {
      _id,
      title,
      client,
      category,
      year,
      duration,
      videoUrl,
      thumbnail,
      description,
      featured,
      order
    }`
  );
}

export async function getSettings(): Promise<SanitySettings | null> {
  return client.fetch(
    `*[_type == "settings"][0] {
      name,
      tagline,
      bio,
      photo,
      email,
      location,
      stats,
      tools,
      socials,
      showreelUrl
    }`
  );
}
