import { NextRequest, NextResponse } from "next/server";
import { serverClient } from "@/sanity/lib/serverClient";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, section, location } = body;

    // Get or create analytics document
    let analytics = await serverClient.fetch(
      `*[_type == "analytics"][0]`
    );

    if (!analytics) {
      analytics = await serverClient.create({
        _type: "analytics",
        totalVisits: 0,
        uniqueVisitors: 0,
        sectionViews: {
          hero: 0,
          about: 0,
          skills: 0,
          experience: 0,
          education: 0,
          projects: 0,
          certifications: 0,
          achievements: 0,
          contact: 0,
        },
        visitorLocations: [],
        lastUpdated: new Date().toISOString(),
      });
    }

    // Update based on type
    if (type === "visit") {
      await serverClient
        .patch(analytics._id)
        .inc({ totalVisits: 1 })
        .set({ lastUpdated: new Date().toISOString() })
        .commit();
    } else if (type === "section" && section) {
      await serverClient
        .patch(analytics._id)
        .inc({ [`sectionViews.${section}`]: 1 })
        .set({ lastUpdated: new Date().toISOString() })
        .commit();
    } else if (type === "location" && location) {
      const { country, city, lat, lng } = location;
      const existingLocations = analytics.visitorLocations || [];
      const locationIndex = existingLocations.findIndex(
        (loc: any) => loc.country === country && loc.city === city
      );

      if (locationIndex >= 0) {
        existingLocations[locationIndex].count += 1;
      } else {
        existingLocations.push({ country, city, lat, lng, count: 1 });
      }

      await serverClient
        .patch(analytics._id)
        .set({
          visitorLocations: existingLocations,
          lastUpdated: new Date().toISOString(),
        })
        .commit();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return NextResponse.json(
      { error: "Failed to track analytics" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const analytics = await serverClient.fetch(
      `*[_type == "analytics"][0]`
    );

    if (!analytics) {
      return NextResponse.json({
        totalVisits: 0,
        uniqueVisitors: 0,
        sectionViews: {},
        visitorLocations: [],
      });
    }

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("Analytics fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
