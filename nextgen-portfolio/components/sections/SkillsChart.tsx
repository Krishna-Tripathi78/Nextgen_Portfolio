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

const categoryGradients: Record<string, { from: string; to: string; text: string; badge: string }> = {
  frontend:    { from: "#a855f7", to: "#ec4899", text: "text-purple-400",  badge: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  backend:     { from: "#3b82f6", to: "#06b6d4", text: "text-blue-400",    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  database:    { from: "#10b981", to: "#6366f1", text: "text-emerald-400", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  devops:      { from: "#f97316", to: "#ef4444", text: "text-orange-400",  badge: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  mobile:      { from: "#ec4899", to: "#f97316", text: "text-pink-400",    badge: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
  tools:       { from: "#6366f1", to: "#8b5cf6", text: "text-indigo-400",  badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
  cloud:       { from: "#0ea5e9", to: "#38bdf8", text: "text-sky-400",     badge: "bg-sky-500/10 text-sky-400 border-sky-500/20" },
  languages:   { from: "#f59e0b", to: "#ef4444", text: "text-amber-400",   badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  default:     { from: "#a855f7", to: "#ec4899", text: "text-purple-400",  badge: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
};

function getCategoryStyle(category: string) {
  return categoryGradients[category.toLowerCase()] || categoryGradients.default;
}

export function SkillsChart({ skills }: SkillsChartProps) {
  if (!skills || skills.length === 0) {
    return null;
  }

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

        const displayLabel = category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        const style = getCategoryStyle(category);

        const chartData = categorySkills.map((skill) => ({
          name: skill.name || "Unknown",
          proficiency: skill.percentage || 0,
          fill: `url(#gradient-${category})`,
        }));

        const chartConfig = {
          proficiency: {
            label: "Proficiency",
            color: style.from,
          },
          default: {
            color: style.from,
          },
        } satisfies ChartConfig;

        const chartHeight = Math.max(140, categorySkills.length * 32);

        return (
          <div
            key={category}
            className="group relative rounded-xl border border-border hover:border-purple-500/30 bg-card overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(168,85,247,0.10)]"
          >
            {/* Top gradient accent */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] opacity-80"
              style={{ background: `linear-gradient(90deg, ${style.from}, ${style.to})` }}
            />

            {/* Category Header */}
            <div className="border-b border-border/50 bg-muted/30 px-5 py-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">{displayLabel}</h3>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${style.badge}`}>
                  {categorySkills.length} skills
                </span>
              </div>
            </div>

            {/* Chart */}
            <div className="p-4">
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
                  margin={{ left: 0, right: 32, top: 5, bottom: 5 }}
                >
                  {/* SVG gradient definition */}
                  <defs>
                    <linearGradient id={`gradient-${category}`} x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor={style.from} stopOpacity={0.9} />
                      <stop offset="100%" stopColor={style.to} stopOpacity={0.7} />
                    </linearGradient>
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
                        labelFormatter={(value: any) => value}
                      />
                    }
                  />
                  <Bar dataKey="proficiency" radius={[0, 6, 6, 0]} barSize={18}>
                    <LabelList
                      dataKey="proficiency"
                      position="right"
                      offset={4}
                      className="fill-foreground text-[10px] font-semibold"
                      formatter={(value: any) => `${value}%`}
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