"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Skill {
  name: string | null;
  category: string | null;
  proficiency: string | null;
  percentage: number | null;
  yearsOfExperience: number | null;
  color: string | null;
}

interface SkillsChartProps {
  skills: Skill[];
}

export function SkillsChart({ skills }: SkillsChartProps) {
  if (!skills || skills.length === 0) {
    return null;
  }

  // Gradient definitions for impressive visual effects
  const gradients = [
    { id: 'gradient1', colors: ['#8b5cf6', '#ec4899'] }, // purple to pink
    { id: 'gradient2', colors: ['#ec4899', '#f97316'] }, // pink to orange
    { id: 'gradient3', colors: ['#f97316', '#f59e0b'] }, // orange to amber
    { id: 'gradient4', colors: ['#06b6d4', '#3b82f6'] }, // cyan to blue
    { id: 'gradient5', colors: ['#3b82f6', '#8b5cf6'] }, // blue to purple
    { id: 'gradient6', colors: ['#10b981', '#06b6d4'] }, // green to cyan
    { id: 'gradient7', colors: ['#f59e0b', '#ef4444'] }, // amber to red
    { id: 'gradient8', colors: ['#14b8a6', '#10b981'] }, // teal to green
    { id: 'gradient9', colors: ['#a855f7', '#ec4899'] }, // violet to pink
    { id: 'gradient10', colors: ['#6366f1', '#8b5cf6'] }, // indigo to purple
  ];

  // Group skills by category dynamically
  const groupedSkills = new Map<string, Skill[]>();

  for (const skill of skills) {
    const category = skill.category || "other";
    const existing = groupedSkills.get(category) || [];
    groupedSkills.set(category, [...existing, skill]);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {Array.from(groupedSkills.entries()).map(([category, categorySkills]) => {
        if (!categorySkills || categorySkills.length === 0) return null;

        // Format category for display
        const displayLabel = category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        // Prepare chart data and config
        const chartData = categorySkills.map((skill, index) => ({
          name: skill.name || "Unknown",
          proficiency: skill.percentage || 0,
          fill: `url(#${gradients[index % gradients.length].id})`,
        }));

        const chartConfig = {
          proficiency: {
            label: "Proficiency",
            color: "hsl(var(--primary))",
          },
          default: {
            color: "hsl(var(--primary))",
          },
        } satisfies ChartConfig;

        // Calculate dynamic height based on number of skills
        const chartHeight = Math.max(140, categorySkills.length * 32);

        return (
          <div
            key={category}
            className="group rounded-xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 hover:-translate-y-1"
          >
            {/* Category Header */}
            <div className="border-b bg-gradient-to-r from-muted/50 to-muted/30 px-4 py-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">{displayLabel}</h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 text-primary font-medium border border-primary/20">
                  {categorySkills.length}
                </span>
              </div>
            </div>

            {/* Chart */}
            <div className="p-4 bg-gradient-to-br from-card to-muted/10">
              <ChartContainer
                id={`skills-chart-${category}`}
                config={chartConfig}
                className="w-full"
                style={{ height: `${chartHeight}px` }}
              >
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  layout="vertical"
                  margin={{
                    left: 0,
                    right: 28,
                    top: 5,
                    bottom: 5,
                  }}
                >
                  <defs>
                    {gradients.map((gradient) => (
                      <linearGradient key={gradient.id} id={gradient.id} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor={gradient.colors[0]} stopOpacity={0.95} />
                        <stop offset="50%" stopColor={gradient.colors[0]} stopOpacity={0.85} />
                        <stop offset="100%" stopColor={gradient.colors[1]} stopOpacity={0.95} />
                      </linearGradient>
                    ))}
                    {gradients.map((gradient) => (
                      <filter key={`glow-${gradient.id}`} id={`glow-${gradient.id}`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    ))}
                  </defs>
                  <XAxis type="number" hide domain={[0, 100]} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    tickMargin={8}
                    axisLine={false}
                    width={85}
                    className="text-xs"
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        indicator="line"
                        nameKey="proficiency"
                        labelFormatter={(value: string) => value}
                      />
                    }
                  />
                  <Bar 
                    dataKey="proficiency" 
                    radius={[0, 8, 8, 0]} 
                    barSize={20}
                    className="transition-all duration-300 hover:opacity-80"
                  >
                    <LabelList
                      dataKey="proficiency"
                      position="right"
                      offset={4}
                      className="fill-foreground text-[10px] font-medium"
                      formatter={(value) => `${value}%`}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}