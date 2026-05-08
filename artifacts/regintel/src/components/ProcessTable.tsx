"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { processes } from "@/data/mock";

const statusConfig = {
  "Em análise": {
    bg: "bg-[#00B5A3]/15",
    text: "text-[#00B5A3]",
    border: "border-[#00B5A3]/30",
    dot: "bg-[#00B5A3]",
  },
  "Concluída análise": {
    bg: "bg-[#00C896]/15",
    text: "text-[#00C896]",
    border: "border-[#00C896]/30",
    dot: "bg-[#00C896]",
  },
  Anuído: {
    bg: "bg-[#7A9BB5]/15",
    text: "text-[#7A9BB5]",
    border: "border-[#7A9BB5]/30",
    dot: "bg-[#7A9BB5]",
  },
  Distribuído: {
    bg: "bg-[#FFB347]/15",
    text: "text-[#FFB347]",
    border: "border-[#FFB347]/30",
    dot: "bg-[#FFB347]",
  },
} as const;

export function ProcessTable() {
  const [search, setSearch] = useState("");

  const filtered = processes.filter(
    (p) =>
      p.processNo.includes(search) ||
      p.molecule.toLowerCase().includes(search.toLowerCase()) ||
      p.subject.toLowerCase().includes(search.toLowerCase()) ||
      p.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#111820] border border-[#1E2A35] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold font-heading text-[#F0F4F8]">
          Recent Processes
        </h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#7A9BB5]" />
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-xs bg-[#0A0F14] border border-[#1E2A35] rounded-lg text-[#F0F4F8] placeholder:text-[#7A9BB5] focus:outline-none focus:ring-1 focus:ring-[#00B5A3] focus:border-[#00B5A3] w-44 transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-[#1E2A35]">
              {["Process No.", "Molecule", "Entry Date", "Clock", "Subject", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left pb-2 pr-4 text-[10px] font-medium uppercase tracking-wide text-[#7A9BB5]"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const s = statusConfig[p.status];
              return (
                <tr
                  key={p.id}
                  className="border-b border-[#1E2A35]/50 table-row-hover transition-all cursor-default"
                  style={{ borderLeft: "2px solid transparent" }}
                >
                  <td className="py-2.5 pr-4 font-mono text-[#00B5A3] text-[10px]">
                    {p.processNo.slice(0, 8)}...
                  </td>
                  <td className="py-2.5 pr-4 text-[#F0F4F8] font-medium whitespace-nowrap">
                    {p.molecule}
                  </td>
                  <td className="py-2.5 pr-4 text-[#7A9BB5] whitespace-nowrap">
                    {p.entryDate}
                  </td>
                  <td className="py-2.5 pr-4 text-[#F0F4F8] font-heading font-semibold">
                    {p.clockCounter.toLocaleString()}
                  </td>
                  <td className="py-2.5 pr-4 text-[#7A9BB5] whitespace-nowrap max-w-[120px] truncate">
                    {p.subject}
                  </td>
                  <td className="py-2.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border ${s.bg} ${s.text} ${s.border}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {p.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
