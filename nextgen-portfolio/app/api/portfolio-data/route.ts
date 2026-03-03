import { createClient } from "next-sanity";

// TypeScript interfaces for type safety
interface Profile {
  name: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

interface Skill {
  name: string;
  category: string;
  proficiency: number;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface Experience {
  company: string;
  position: string;
  duration: string;
  description?: string;
}

interface Education {
  institution: string;
  degree: string;
  duration: string;
}

// Validate required environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId) {
  throw new Error(
    "Missing required environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
  );
}

if (!dataset) {
  throw new Error(
    "Missing required environment variable: NEXT_PUBLIC_SANITY_DATASET",
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
});

export async function GET() {
  try {
    const [profile, skills, projects, experience, _education] =
      await Promise.all([
        client.fetch<Profile>(
          `*[_type == "profile"][0]{ name, bio, email, phone, location, socialLinks }`,
        ),
        client.fetch<Skill[]>(
          `*[_type == "skill"]{ name, category, proficiency }`,
        ),
        client.fetch<Project[]>(
          `*[_type == "project"]{ title, description, technologies, link }`,
        ),
        client.fetch<Experience[]>(
          `*[_type == "experience"]{ company, position, duration, description }`,
        ),
        client.fetch<Education[]>(
          `*[_type == "education"]{ institution, degree, duration }`,
        ),
      ]);

    const knowledge = `
You are ${profile?.name || "Krishna"}'s AI assistant.

## About
${profile?.bio || "Full Stack Developer"}
Email: ${profile?.email || "krishnatripathi07042005@gmail.com"}

## Skills
${skills?.map((s) => s.name).join(", ") || "React, Next.js, Node.js"}

## Projects
${
  projects
    ?.slice(0, 3)
    .map((p) => `${p.title}`)
    .join(", ") || "Web applications"
}

## Experience
${
  experience
    ?.slice(0, 2)
    .map((e) => `${e.position} at ${e.company}`)
    .join(", ") || "Developer"
}

## Response Format Rules
- Use **bold** for important terms (wrap in **text**)
- Use bullet points with • symbol
- Add line breaks between points
- Keep responses SHORT (2-3 points max)
- Be friendly and conversational
- Example: "• **Frontend:** React, Next.js\n• **Backend:** Node.js"
`;

    return Response.json({ knowledge });
  } catch (_error) {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}
