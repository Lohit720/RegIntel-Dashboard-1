"use client";

import { useEffect, useRef, useState } from "react";
import {
  Layers,
  Clock,
  AlertCircle,
  CheckCircle,
  FilePlus,
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  numericValue?: number;
  icon: "layers" | "clock" | "alert-circle" | "check-circle" | "file-plus" | "map-pin";
  trend?: number;
  trendLabel?: string;
  subtitle?: string;
  highlight?: "amber" | "green" | "teal" | "muted";
  pills?: string[];
  animateIndex?: number;
}

const iconMap = {
  layers: Layers,
  clock: Clock,
  "alert-circle": AlertCircle,
  "check-circle": CheckCircle,
  "file-plus": FilePlus,
  "map-pin": MapPin,
};

function useCountUp(target: number, duration = 1200, delay = 0) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      if (!started.current) {
        started.current = true;
        requestAnimationFrame(tick);
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  return count;
}

export function KpiCard({
  title,
  value,
  numericValue,
  icon,
  trend,
  trendLabel,
  subtitle,
  highlight = "teal",
  pills,
  animateIndex = 0,
}: KpiCardProps) {
  const Icon = iconMap[icon];
  const animated = useCountUp(numericValue ?? 0, 1200, animateIndex * 80);
  const displayValue = numericValue !== undefined ? animated.toLocaleString() : value;

  const highlightBorder = {
    amber: "hover:border-yellow-400/40",
    green: "hover:border-green-400/40",
    teal: "hover:border-[#00B5A3]/40",
    muted: "hover:border-[#7A9BB5]/30",
  };

  const iconColor = {
    amber: "text-[#FFB347]",
    green: "text-[#00C896]",
    teal: "text-[#00B5A3]",
    muted: "text-[#7A9BB5]",
  };

  const dotColor = {
    amber: "bg-[#FFB347]",
    green: "bg-[#00C896]",
    teal: "bg-[#00B5A3]",
    muted: "bg-[#7A9BB5]",
  };

  return (
    <div
      className={`bg-[#111820] border border-[#1E2A35] rounded-2xl p-5 card-hover cursor-default ${highlightBorder[highlight]}`}
      style={{ animationDelay: `${animateIndex * 60}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${dotColor[highlight]} ${highlight === "amber" ? "animate-pulse" : ""}`} />
          <span className="text-xs text-[#7A9BB5] font-medium uppercase tracking-wide">{title}</span>
        </div>
        <Icon className={`w-4 h-4 ${iconColor[highlight]}`} />
      </div>

      <div className="mb-1">
        <span className="text-2xl font-bold font-heading text-[#F0F4F8] animate-count-up">
          {displayValue}
        </span>
        {subtitle && (
          <span className="ml-2 text-xs text-[#7A9BB5]">{subtitle}</span>
        )}
      </div>

      {trend !== undefined && (
        <div className="flex items-center gap-1 text-xs">
          {trend > 0 ? (
            <TrendingUp className="w-3 h-3 text-[#00C896]" />
          ) : trend < 0 ? (
            <TrendingDown className="w-3 h-3 text-[#FF6B6B]" />
          ) : (
            <Minus className="w-3 h-3 text-[#7A9BB5]" />
          )}
          <span
            className={
              trend > 0
                ? "text-[#00C896]"
                : trend < 0
                ? "text-[#FF6B6B]"
                : "text-[#7A9BB5]"
            }
          >
            {trend > 0 ? "+" : ""}
            {trend}%
          </span>
          {trendLabel && <span className="text-[#7A9BB5]">{trendLabel}</span>}
        </div>
      )}

      {pills && pills.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {pills.map((p) => (
            <span
              key={p}
              className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#1E2A35] text-[#7A9BB5] border border-[#2A3A4A]"
            >
              {p}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
