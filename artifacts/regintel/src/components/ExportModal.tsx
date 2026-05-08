"use client";

import { useState } from "react";
import { X, Download, Calendar, FileSpreadsheet } from "lucide-react";

interface ExportModalProps {
  open: boolean;
  onClose: () => void;
}

const SHEETS = [
  { id: "summary", label: "Process Summary Sheet", checked: true },
  { id: "heatmap", label: "Area Status Heatmap", checked: true },
  { id: "clock", label: "Clock Counter History", checked: true },
  { id: "kpi", label: "KPI Snapshot", checked: true },
  { id: "raw", label: "Raw Process Data", checked: false },
];

type Format = "XLSX" | "CSV" | "PDF";

export function ExportModal({ open, onClose }: ExportModalProps) {
  const [sheets, setSheets] = useState(SHEETS);
  const [format, setFormat] = useState<Format>("XLSX");
  const [fromDate, setFromDate] = useState("2026-01-01");
  const [toDate, setToDate] = useState("2026-05-08");

  const toggleSheet = (id: string) => {
    setSheets((prev) =>
      prev.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#111820] border border-[#1E2A35] rounded-2xl p-8 w-[520px] max-w-[95vw] shadow-2xl animate-fade-in-up">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h2 className="text-lg font-bold font-heading text-[#F0F4F8] flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#00B5A3]" />
              Export Dashboard Data
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#1E2A35] text-[#7A9BB5] hover:text-[#F0F4F8] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-[#7A9BB5] mb-6">
          Select data to include in your Excel workbook
        </p>

        <div className="space-y-2.5 mb-6">
          {sheets.map((sheet) => (
            <label
              key={sheet.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                onClick={() => toggleSheet(sheet.id)}
                className={`w-4 h-4 rounded flex items-center justify-center border transition-all flex-shrink-0 ${
                  sheet.checked
                    ? "bg-[#00B5A3] border-[#00B5A3]"
                    : "border-[#1E2A35] bg-[#0A0F14]"
                }`}
              >
                {sheet.checked && (
                  <svg className="w-2.5 h-2.5 text-[#0A0F14]" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className={`text-sm transition-colors ${sheet.checked ? "text-[#F0F4F8]" : "text-[#7A9BB5]"}`}>
                {sheet.label}
              </span>
            </label>
          ))}
        </div>

        <div className="mb-6">
          <label className="text-xs font-medium text-[#7A9BB5] uppercase tracking-wide mb-2 block">
            Date Range
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-[#7A9BB5] font-medium">
                FROM
              </span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full pl-14 pr-3 py-2.5 text-xs bg-[#0A0F14] border border-[#1E2A35] rounded-xl text-[#F0F4F8] focus:outline-none focus:ring-1 focus:ring-[#00B5A3] focus:border-[#00B5A3] transition-all"
              />
            </div>
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-[#7A9BB5] font-medium">
                TO
              </span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 text-xs bg-[#0A0F14] border border-[#1E2A35] rounded-xl text-[#F0F4F8] focus:outline-none focus:ring-1 focus:ring-[#00B5A3] focus:border-[#00B5A3] transition-all"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-xs font-medium text-[#7A9BB5] uppercase tracking-wide mb-2 block">
            Format
          </label>
          <div className="flex gap-2">
            {(["XLSX", "CSV", "PDF"] as Format[]).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  format === f
                    ? "bg-[#00B5A3] text-[#0A0F14]"
                    : "bg-[#0A0F14] border border-[#1E2A35] text-[#7A9BB5] hover:border-[#00B5A3]/50"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium text-[#7A9BB5] border border-[#1E2A35] hover:border-[#7A9BB5]/50 hover:text-[#F0F4F8] transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-[#00B5A3] text-[#0A0F14] hover:bg-[#00D4C0] transition-all flex items-center justify-center gap-2 glow-teal"
          >
            <Download className="w-4 h-4" />
            Download {format}
          </button>
        </div>

        <p className="text-center text-[10px] text-[#7A9BB5]">
          File will contain multiple sheets with pivot-ready formatting
        </p>
      </div>
    </div>
  );
}
