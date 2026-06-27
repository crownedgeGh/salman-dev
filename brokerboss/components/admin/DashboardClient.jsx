"use client";

import { useState } from "react";
import {
  Users,
  Building2,
  Megaphone,
  IndianRupee,
  UserPlus,
  Home,
  PauseCircle,
  CheckCircle,
  UserX,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import StatCard from "@/components/admin/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MOCK_STATS,
  CHART_ACTIVITY,
  CHART_ADS,
  MOCK_ACTIVITY,
} from "@/data/adminMock";

const ACTIVITY_ICONS = {
  UserPlus: <UserPlus className="w-4 h-4 text-amber-500" />,
  Home: <Home className="w-4 h-4 text-blue-500" />,
  Megaphone: <Megaphone className="w-4 h-4 text-purple-500" />,
  UserX: <UserX className="w-4 h-4 text-red-500" />,
  CheckCircle: <CheckCircle className="w-4 h-4 text-green-500" />,
  PauseCircle: <PauseCircle className="w-4 h-4 text-yellow-500" />,
};

const chartConfig = {
  users: { label: "Users", color: "oklch(0.72 0.16 65)" },
  properties: { label: "Properties", color: "oklch(0.60 0.12 200)" },
};

const adsChartConfig = {
  impressions: { label: "Impressions", color: "oklch(0.72 0.16 65)" },
  clicks: { label: "Clicks", color: "oklch(0.60 0.18 150)" },
};

export default function DashboardClient() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Welcome back! Here&apos;s what&apos;s happening on BrokerBoss.
        </p>
      </div>

      {/* ── KPI Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label={MOCK_STATS.totalUsers.label}
          value={MOCK_STATS.totalUsers.value}
          change={MOCK_STATS.totalUsers.change}
          icon={Users}
          color="amber"
        />
        <StatCard
          label={MOCK_STATS.propertiesListed.label}
          value={MOCK_STATS.propertiesListed.value}
          change={MOCK_STATS.propertiesListed.change}
          icon={Building2}
          color="blue"
        />
        <StatCard
          label={MOCK_STATS.activeAds.label}
          value={MOCK_STATS.activeAds.value}
          change={MOCK_STATS.activeAds.change}
          icon={Megaphone}
          color="purple"
        />
        <StatCard
          label={MOCK_STATS.revenue.label}
          value={MOCK_STATS.revenue.value}
          change={MOCK_STATS.revenue.change}
          icon={IndianRupee}
          color="green"
        />
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity Trend — Area Chart */}
        <Card className="lg:col-span-2 border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              Activity Trend (Last 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-52 w-full">
              <AreaChart data={CHART_ACTIVITY} margin={{ left: -10, right: 8 }}>
                <defs>
                  <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.72 0.16 65)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.72 0.16 65)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="propsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.60 0.12 200)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.60 0.12 200)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.025 75)" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} interval={6} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="oklch(0.72 0.16 65)"
                  strokeWidth={2}
                  fill="url(#usersGrad)"
                  dot={false}
                  name="Users"
                />
                <Area
                  type="monotone"
                  dataKey="properties"
                  stroke="oklch(0.60 0.12 200)"
                  strokeWidth={2}
                  fill="url(#propsGrad)"
                  dot={false}
                  name="Properties"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {MOCK_ACTIVITY.map((item) => (
              <div key={item.id} className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                  {ACTIVITY_ICONS[item.icon]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground leading-snug line-clamp-2">
                    {item.message}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* ── Ad Performance Bar Chart ── */}
      <Card className="border border-border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">
            Ad Performance — Top 5 Active Ads
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={adsChartConfig} className="h-52 w-full">
            <BarChart data={CHART_ADS} margin={{ left: -10, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.90 0.025 75)" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="impressions" fill="oklch(0.72 0.16 65)" radius={[4, 4, 0, 0]} name="Impressions" />
              <Bar dataKey="clicks" fill="oklch(0.60 0.18 150)" radius={[4, 4, 0, 0]} name="Clicks" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
