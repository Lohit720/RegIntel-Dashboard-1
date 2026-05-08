"use client";

import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  action?: ReactNode;
}

export function ChartCard({ title, subtitle, children, className = "", style, action }: ChartCardProps) {
  return (
    <div
      className={`bg-[#111820] border border-[#1E2A35] rounded-2xl p-5 card-hover ${className}`}
      style={style}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold font-heading text-[#F0F4F8]">{title}</h3>
          {subtitle && (
            <p className="text-xs text-[#7A9BB5] mt-0.5">{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
}
