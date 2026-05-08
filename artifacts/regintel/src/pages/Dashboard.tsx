"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Search,
  Bell,
  LogOut,
  Zap,
  FileSpreadsheet,
  FileText,
  Upload,
  LayoutDashboard,
  ListChecks,
  MessageSquare,
  BarChart2,
  TrendingUp,
} from "lucide-react";
import { KpiCard } from "@/components/KpiCard";
import { ProcessTable } from "@/components/ProcessTable";
import { AreaHeatmap } from "@/components/AreaHeatmap";
import { ExportModal } from "@/components/ExportModal";
import { ChartCard } from "@/components/ChartCard";
import {
  areaStatuses,
  clockCounterTrend,
  subjectBreakdown,
  processEntryTimeline,
} from "@/data/mock";
import { toast } from "sonner";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Process Tracker", icon: ListChecks },
  { label: "Query Tracker", icon: MessageSquare },
  { label: "Reports", icon: FileText },
  { label: "Analytics", icon: BarChart2 },
];

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111820] border border-[#1E2A35] rounded-xl px-3 py-2 text-xs shadow-xl">
        <p className="text-[#7A9BB5] mb-1">{label}</p>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
            <span className="text-[#F0F4F8]">{p.name}: <strong>{p.value}</strong></span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [exportOpen, setExportOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F14]">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 h-14 bg-[#0A0F14] border-b border-[#1E2A35] flex items-center px-6 gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-6 flex-shrink-0">
          <div className="w-7 h-7 rounded-lg bg-[#00B5A3]/15 border border-[#00B5A3]/40 flex items-center justify-center logo-glow">
            <span className="text-[#00B5A3] font-bold font-heading text-xs">7D</span>
          </div>
          <div>
            <span className="text-sm font-bold font-heading text-[#00B5A3] tracking-tight">RegIntel</span>
            <p className="text-[9px] text-[#7A9BB5] leading-none -mt-0.5">Regulatory Intelligence</p>
          </div>
        </div>

        {/* Nav Pills */}
        <div className="flex items-center gap-1 flex-1">
          {NAV_ITEMS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeNav === label
                  ? "nav-pill-active"
                  : "text-[#7A9BB5] hover:text-[#F0F4F8] hover:bg-[#1E2A35]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="p-2 rounded-lg text-[#7A9BB5] hover:text-[#F0F4F8] hover:bg-[#1E2A35] transition-all">
            <Search className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg text-[#7A9BB5] hover:text-[#F0F4F8] hover:bg-[#1E2A35] transition-all relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#FF6B6B] rounded-full" />
          </button>
          <div className="w-7 h-7 rounded-full bg-[#00B5A3]/20 border border-[#00B5A3]/40 flex items-center justify-center">
            <span className="text-[10px] font-bold font-heading text-[#00B5A3]">U1</span>
          </div>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#00B5A3] border border-[#00B5A3]/50 hover:bg-[#00B5A3]/10 transition-all flex items-center gap-1.5">
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="p-6 max-w-[1600px] mx-auto">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-xl font-bold font-heading text-[#F0F4F8]">
            Regulatory Dashboard
          </h1>
          <p className="text-xs text-[#7A9BB5] mt-0.5">
            Overview · May 2026 · ANVISA Process Intelligence
          </p>
        </div>

        {/* KPI ROW */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
        >
          <KpiCard title="Total Active Processes" value="847" numericValue={847} icon="layers" trend={12} trendLabel="vs last month" highlight="teal" animateIndex={0} />
          <KpiCard title="Avg Clock Counter" value="1,138" numericValue={1138} icon="clock" trend={-3} trendLabel="" subtitle="regulatory days" highlight="muted" animateIndex={1} />
          <KpiCard title="Pending Analysis" value="23" numericValue={23} icon="alert-circle" highlight="amber" animateIndex={2} />
          <KpiCard title="Completed This Month" value="61" numericValue={61} icon="check-circle" trend={8} highlight="green" animateIndex={3} />
          <KpiCard title="New Entries (MTD)" value="14" numericValue={14} icon="file-plus" highlight="teal" animateIndex={4} />
          <KpiCard title="Areas Under Review" value="5" numericValue={5} icon="map-pin" highlight="muted" pills={["CBRES","CETER","GESEF","COIFA","GQMED"]} animateIndex={5} />
        </div>

        {/* MAIN GRID — 60/40 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
          {/* LEFT — 60% */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* Process Status by Area stacked bar */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0ms", opacity: 0, animationFillMode: "forwards" }}
            >
              <ChartCard title="Process Status by Area" subtitle="Stacked by workflow stage">
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={areaStatuses} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E2A35" horizontal={false} />
                    <XAxis type="number" tick={{ fill: "#7A9BB5", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="area" tick={{ fill: "#7A9BB5", fontSize: 11 }} axisLine={false} tickLine={false} width={48} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{ fontSize: "11px", color: "#7A9BB5", paddingTop: "12px" }}
                    />
                    <Bar dataKey="emAnalise" name="Em análise" stackId="a" fill="#00B5A3" radius={[0, 0, 0, 0]} />
                    <Bar dataKey="concluida" name="Concluída análise" stackId="a" fill="#00C896" />
                    <Bar dataKey="anuido" name="Anuído" stackId="a" fill="#7A9BB5" />
                    <Bar dataKey="distribuido" name="Distribuído" stackId="a" fill="#FFB347" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* Recent Processes Table */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "100ms", opacity: 0, animationFillMode: "forwards" }}
            >
              <ProcessTable />
            </div>
          </div>

          {/* RIGHT — 40% */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Area Activity Heatmap */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "150ms", opacity: 0, animationFillMode: "forwards" }}
            >
              <AreaHeatmap />
            </div>

            {/* Clock Counter Trend */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "200ms", opacity: 0, animationFillMode: "forwards" }}
            >
              <ChartCard title="Clock Counter Trend" subtitle="6-month regulatory days avg">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={clockCounterTrend} margin={{ left: -8, right: 8, top: 4, bottom: 4 }}>
                    <defs>
                      <linearGradient id="clockGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00B5A3" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#00B5A3" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E2A35" />
                    <XAxis dataKey="month" tick={{ fill: "#7A9BB5", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: "#7A9BB5", fontSize: 10 }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      name="Avg Days"
                      stroke="#00B5A3"
                      strokeWidth={2}
                      fill="url(#clockGrad)"
                      dot={{ fill: "#00B5A3", r: 3, strokeWidth: 0 }}
                      activeDot={{ r: 5, fill: "#00D4C0" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW — 3-col */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Card A — Top Subjects */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "250ms", opacity: 0, animationFillMode: "forwards" }}
          >
            <ChartCard title="Top Subjects" subtitle="By submission type">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={subjectBreakdown}
                  layout="vertical"
                  margin={{ left: 0, right: 40, top: 4, bottom: 4 }}
                >
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#00B5A3" />
                      <stop offset="100%" stopColor="#00D4C0" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2A35" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "#7A9BB5", fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis
                    type="category"
                    dataKey="subject"
                    tick={{ fill: "#7A9BB5", fontSize: 9 }}
                    axisLine={false}
                    tickLine={false}
                    width={100}
                    tickFormatter={(v: string) => v.length > 14 ? v.slice(0, 14) + "…" : v}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Count" fill="url(#barGrad)" radius={[0, 4, 4, 0]} label={{ position: "right", fill: "#7A9BB5", fontSize: 9 }} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Card B — Process Entry Timeline */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "350ms", opacity: 0, animationFillMode: "forwards" }}
          >
            <ChartCard title="Process Entry Timeline" subtitle="Jan 2023 – May 2026">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart
                  data={processEntryTimeline}
                  margin={{ left: -8, right: 8, top: 4, bottom: 4 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2A35" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#7A9BB5", fontSize: 8 }}
                    axisLine={false}
                    tickLine={false}
                    interval={4}
                  />
                  <YAxis tick={{ fill: "#7A9BB5", fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    name="Entries"
                    stroke="#00D4C0"
                    strokeWidth={2}
                    dot={{ fill: "#00B5A3", r: 2, strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: "#00D4C0" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Card C — Quick Actions */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "450ms", opacity: 0, animationFillMode: "forwards" }}
          >
            <div className="bg-[#111820] border border-[#1E2A35] rounded-2xl p-5 card-hover h-full">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-[#00B5A3]" />
                <h3 className="text-sm font-semibold font-heading text-[#F0F4F8]">Actions</h3>
              </div>

              <div className="flex flex-col gap-3">
                <button className="w-full py-2.5 rounded-xl text-sm font-semibold bg-[#00B5A3] text-[#0A0F14] hover:bg-[#00D4C0] transition-all flex items-center justify-center gap-2 glow-teal">
                  <TrendingUp className="w-4 h-4" />
                  + Add Process
                </button>

                <button
                  className="w-full py-2.5 rounded-xl text-sm font-medium border border-[#00B5A3]/60 text-[#00B5A3] hover:bg-[#00B5A3]/10 transition-all flex items-center justify-center gap-2"
                  onClick={() => {
                    setExportOpen(true);
                    toast.success("Opening export options...", {
                      description: "Generating Excel workbook",
                      style: {
                        background: "#111820",
                        border: "1px solid #1E2A35",
                        borderLeft: "3px solid #00B5A3",
                        color: "#F0F4F8",
                      },
                    });
                  }}
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Export to Excel
                </button>

                <button className="w-full py-2.5 rounded-xl text-sm font-medium border border-[#1E2A35] text-[#7A9BB5] hover:border-[#7A9BB5]/50 hover:text-[#F0F4F8] transition-all flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  Generate Report
                </button>

                <button className="w-full py-2.5 rounded-xl text-sm font-medium text-[#7A9BB5] hover:text-[#F0F4F8] hover:bg-[#1E2A35] transition-all flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  Bulk Import CSV
                </button>
              </div>

              <div className="flex gap-2 mt-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#1E2A35] text-[#7A9BB5] border border-[#2A3A4A]">
                  Last export: Today 09:41
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#00B5A3]/10 text-[#00B5A3] border border-[#00B5A3]/20">
                  Next sync: 5 min
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </div>
  );
}
