"use client";

import { heatmapData } from "@/data/mock";

const AREAS = ["CBRES", "CETER", "GESEF", "COIFA", "GQMED"];
const DATES = ["18/02/2026", "08/12/2025", "03/12/2025"];

function getOpacity(value: number | null, max = 22): number {
  if (value === null) return 0;
  return 0.15 + (value / max) * 0.75;
}

export function AreaHeatmap() {
  const getCellValue = (area: string, date: string) => {
    const cell = heatmapData.find((c) => c.area === area && c.date === date);
    return cell?.value ?? null;
  };

  return (
    <div className="bg-[#111820] border border-[#1E2A35] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold font-heading text-[#F0F4F8]">
          Area Activity Heatmap
        </h3>
        <span className="text-[10px] text-[#7A9BB5] uppercase tracking-wide">
          Process count
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left pb-2 pr-3 w-16 text-[10px] font-medium uppercase tracking-wide text-[#7A9BB5]">
                Area
              </th>
              {DATES.map((d) => (
                <th
                  key={d}
                  className="pb-2 px-1 text-[10px] font-medium text-[#7A9BB5] text-center whitespace-nowrap"
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AREAS.map((area) => (
              <tr key={area}>
                <td className="py-1.5 pr-3">
                  <span className="text-[11px] font-semibold text-[#7A9BB5]">
                    {area}
                  </span>
                </td>
                {DATES.map((date) => {
                  const value = getCellValue(area, date);
                  const opacity = getOpacity(value);
                  return (
                    <td key={date} className="py-1.5 px-1 text-center">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto transition-all hover:scale-105 cursor-default"
                        style={{
                          backgroundColor:
                            value !== null
                              ? `rgba(0, 181, 163, ${opacity})`
                              : "#0A0F14",
                          border:
                            value !== null
                              ? `1px solid rgba(0, 181, 163, ${opacity + 0.1})`
                              : "1px solid #1E2A35",
                        }}
                        title={value !== null ? `${area} · ${date}: ${value}` : "No data"}
                      >
                        {value !== null ? (
                          <span
                            className="text-xs font-bold font-heading"
                            style={{
                              color:
                                opacity > 0.5
                                  ? "#0A0F14"
                                  : "#00D4C0",
                            }}
                          >
                            {value}
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#1E2A35]">—</span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <span className="text-[10px] text-[#7A9BB5]">Low</span>
        <div className="flex gap-0.5">
          {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((o) => (
            <div
              key={o}
              className="w-5 h-3 rounded-sm"
              style={{ backgroundColor: `rgba(0, 181, 163, ${o})` }}
            />
          ))}
        </div>
        <span className="text-[10px] text-[#7A9BB5]">High</span>
      </div>
    </div>
  );
}
