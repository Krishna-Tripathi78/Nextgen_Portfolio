"use client";

import { useEffect, useState } from "react";
import { Eye, TrendingUp, Globe, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  sectionViews: {
    hero: number;
    about: number;
    skills: number;
    experience: number;
    education: number;
    projects: number;
    certifications: number;
    achievements: number;
    contact: number;
  };
  visitorLocations: Array<{
    country: string;
    city: string;
    count: number;
    lat: number;
    lng: number;
  }>;
}

const COLORS = ["#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#06b6d4", "#f97316", "#84cc16"];

export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/analytics");
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-500 border-r-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!analytics) return null;

  const sectionData = Object.entries(analytics.sectionViews || {}).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    views: value,
  }));

  const topLocations = (analytics.visitorLocations || [])
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <section id="analytics" className="py-20 px-6 bg-muted/30 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-heading">Analytics Dashboard</h2>
          <p className="text-xl text-muted-foreground">
            Real-time insights into portfolio engagement
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-card border border-border rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold mb-1">{analytics.totalVisits.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">Total Visits</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(59,130,246,0.12)]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold mb-1">{analytics.uniqueVisitors.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground">Unique Visitors</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:border-pink-500/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(236,72,153,0.12)]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{topLocations.length}</h3>
            <p className="text-sm text-muted-foreground">Countries</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:border-orange-500/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(249,115,22,0.12)]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">
              {Object.values(analytics.sectionViews || {}).reduce((a, b) => a + b, 0).toLocaleString()}
            </h3>
            <p className="text-sm text-muted-foreground">Section Views</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section Views Bar Chart */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6">Popular Sections</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="views" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Locations */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-6">Top Visitor Locations</h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {topLocations.map((location, index) => (
                <div
                  key={`${location.country}-${location.city}`}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{location.city}</p>
                      <p className="text-sm text-muted-foreground">{location.country}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{location.count}</p>
                    <p className="text-xs text-muted-foreground">visits</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Distribution Pie Chart */}
        <div className="mt-8 bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6">Section Engagement Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sectionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="views"
              >
                {sectionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
