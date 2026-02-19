import type { Program } from "../types/calculator";

export const COST_PER_CREDIT = 850;

export interface ProgramInfo {
  label: string;
  credits: number;
  cost: number;
}

export const PROGRAMS: Record<Program, ProgramInfo> = {
  mat_32: {
    label: "Master of Arts in Teaching (32 credits)",
    credits: 32,
    cost: 27_200,
  },
  mat_38_cld: {
    label: "MAT – Culturally & Linguistically Diverse (38 credits)",
    credits: 38,
    cost: 32_300,
  },
  mat_39_sped: {
    label: "MAT – Special Education (39 credits)",
    credits: 39,
    cost: 33_150,
  },
  alt_cert_18: {
    label: "Alternative Certification (18 credits)",
    credits: 18,
    cost: 15_300,
  },
  alt_cert_21: {
    label: "Alternative Certification (21 credits)",
    credits: 21,
    cost: 17_850,
  },
  alt_cert_24: {
    label: "Alternative Certification (24 credits)",
    credits: 24,
    cost: 20_400,
  },
  adv_cert_sped: {
    label: "Advanced Certificate – Special Education (21 credits)",
    credits: 21,
    cost: 17_850,
  },
};

export const PROGRAM_KEYS = Object.keys(PROGRAMS) as Program[];
