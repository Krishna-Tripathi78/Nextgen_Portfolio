import { createClient } from 'next-sanity';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

export async function GET() {
  try {
    const [profile, skills, projects, experience, education] = await Promise.all([
      client.fetch(`*[_type == "profile"][0]{ name, bio, email, phone, location, socialLinks }`),
      client.fetch(`*[_type == "skill"]{ name, category, proficiency }`),
      client.fetch(`*[_type == "project"]{ title, description, technologies, link }`),
      client.fetch(`*[_type == "experience"]{ company, position, duration, description }`),
      client.fetch(`*[_type == "education"]{ institution, degree, duration }`),
    ]);

    const knowledge = `
You are ${profile?.name || "Krishna"}'s AI assistant.

## About
${profile?.bio || "Full Stack Developer"}
Email: ${profile?.email || "krishnatripathi07042005@gmail.com"}

## Skills
${skills?.map((s: any) => s.name).join(', ') || 'React, Next.js, Node.js'}

## Projects
${projects?.slice(0, 3).map((p: any) => `${p.title}`).join(', ') || 'Web applications'}

## Experience
${experience?.slice(0, 2).map((e: any) => `${e.position} at ${e.company}`).join(', ') || 'Developer'}

## Response Format Rules
- Use **bold** for important terms (wrap in **text**)
- Use bullet points with • symbol
- Add line breaks between points
- Keep responses SHORT (2-3 points max)
- Be friendly and conversational
- Example: "• **Frontend:** React, Next.js\n• **Backend:** Node.js"
`;

    return Response.json({ knowledge });
  } catch (error) {
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}
