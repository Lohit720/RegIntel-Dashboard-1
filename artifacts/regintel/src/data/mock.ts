export interface Process {
  id: string;
  processNo: string;
  molecule: string;
  entryDate: string;
  clockCounter: number;
  subject: string;
  status: "Em análise" | "Concluída análise" | "Anuído" | "Distribuído";
  area: string;
}

export interface AreaStatus {
  area: string;
  emAnalise: number;
  concluida: number;
  anuido: number;
  distribuido: number;
}

export interface ClockCounterPoint {
  month: string;
  value: number;
}

export interface SubjectBreakdown {
  subject: string;
  count: number;
}

export interface HeatmapCell {
  area: string;
  date: string;
  value: number | null;
}

export const processes: Process[] = [
  {
    id: "1",
    processNo: "25351006816202392",
    molecule: "Metformin HCl 500mg",
    entryDate: "18/02/2026",
    clockCounter: 1243,
    subject: "MEDICAMENTO INOVADOR",
    status: "Em análise",
    area: "CBRES",
  },
  {
    id: "2",
    processNo: "25351085278202394",
    molecule: "Atorvastatin 20mg",
    entryDate: "08/12/2025",
    clockCounter: 987,
    subject: "SIMILAR Medicamento Similar",
    status: "Concluída análise",
    area: "CETER",
  },
  {
    id: "3",
    processNo: "25351486491202310",
    molecule: "Losartan 50mg",
    entryDate: "03/12/2025",
    clockCounter: 1138,
    subject: "Genérico",
    status: "Distribuído",
    area: "GESEF",
  },
  {
    id: "4",
    processNo: "25351240993202487",
    molecule: "Omeprazol 20mg",
    entryDate: "15/01/2026",
    clockCounter: 756,
    subject: "Nova Concentração",
    status: "Anuído",
    area: "COIFA",
  },
  {
    id: "5",
    processNo: "25351087708200930",
    molecule: "Azitromicina 500mg",
    entryDate: "22/03/2026",
    clockCounter: 1421,
    subject: "SIMILAR Medicamento Similar",
    status: "Em análise",
    area: "GQMED",
  },
];

export const areaStatuses: AreaStatus[] = [
  { area: "CBRES", emAnalise: 18, concluida: 12, anuido: 8, distribuido: 6 },
  { area: "CETER", emAnalise: 22, concluida: 15, anuido: 10, distribuido: 9 },
  { area: "GESEF", emAnalise: 14, concluida: 9, anuido: 5, distribuido: 7 },
  { area: "COIFA", emAnalise: 16, concluida: 11, anuido: 7, distribuido: 4 },
  { area: "GQMED", emAnalise: 20, concluida: 14, anuido: 9, distribuido: 8 },
];

export const clockCounterTrend: ClockCounterPoint[] = [
  { month: "Dec", value: 1050 },
  { month: "Jan", value: 1100 },
  { month: "Feb", value: 1080 },
  { month: "Mar", value: 1130 },
  { month: "Apr", value: 1115 },
  { month: "May", value: 1138 },
];

export const subjectBreakdown: SubjectBreakdown[] = [
  { subject: "SIMILAR Medicamento Similar", count: 42 },
  { subject: "MEDICAMENTO INOVADOR", count: 28 },
  { subject: "Nova Concentração", count: 15 },
  { subject: "Genérico", count: 10 },
];

export const processEntryTimeline = [
  { month: "Jan/23", value: 8 },
  { month: "Feb/23", value: 12 },
  { month: "Mar/23", value: 9 },
  { month: "Apr/23", value: 14 },
  { month: "May/23", value: 11 },
  { month: "Jun/23", value: 16 },
  { month: "Jul/23", value: 13 },
  { month: "Aug/23", value: 18 },
  { month: "Sep/23", value: 15 },
  { month: "Oct/23", value: 20 },
  { month: "Nov/23", value: 17 },
  { month: "Dec/23", value: 22 },
  { month: "Jan/24", value: 14 },
  { month: "Feb/24", value: 19 },
  { month: "Mar/24", value: 24 },
  { month: "Apr/24", value: 28 },
  { month: "May/24", value: 21 },
  { month: "Jun/24", value: 25 },
  { month: "Jul/24", value: 30 },
  { month: "Aug/24", value: 27 },
  { month: "Sep/24", value: 32 },
  { month: "Oct/24", value: 35 },
  { month: "Nov/24", value: 29 },
  { month: "Dec/24", value: 38 },
  { month: "Jan/25", value: 33 },
  { month: "May/26", value: 40 },
];

export const heatmapData: HeatmapCell[] = [
  { area: "CBRES", date: "18/02/2026", value: 10 },
  { area: "CBRES", date: "08/12/2025", value: 22 },
  { area: "CBRES", date: "03/12/2025", value: null },
  { area: "CETER", date: "18/02/2026", value: 15 },
  { area: "CETER", date: "08/12/2025", value: 8 },
  { area: "CETER", date: "03/12/2025", value: 19 },
  { area: "GESEF", date: "18/02/2026", value: null },
  { area: "GESEF", date: "08/12/2025", value: 12 },
  { area: "GESEF", date: "03/12/2025", value: 7 },
  { area: "COIFA", date: "18/02/2026", value: 20 },
  { area: "COIFA", date: "08/12/2025", value: null },
  { area: "COIFA", date: "03/12/2025", value: 14 },
  { area: "GQMED", date: "18/02/2026", value: 6 },
  { area: "GQMED", date: "08/12/2025", value: 18 },
  { area: "GQMED", date: "03/12/2025", value: null },
];
