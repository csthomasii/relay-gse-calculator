export type Program =
  | "mat_32"
  | "mat_38_cld"
  | "mat_39_sped"
  | "alt_cert_18"
  | "alt_cert_21"
  | "alt_cert_24"
  | "adv_cert_sped";

export type SubjectArea = "math_science" | "special_education" | "other";

export type TeachingDuration = "less_than_5" | "5_or_more";

export type YesNo = "yes" | "no";

export type AmeriCorpsStatus = "no" | "already_served" | "enroll_at_relay";

export interface CalculatorAnswers {
  program: Program | null;
  hasAmeriCorps: AmeriCorpsStatus | null;
  teachGrantEligible: YesNo | null;
  subjectArea: SubjectArea | null;
  teachingDuration: TeachingDuration | null;
  applyNeedBasedAid: YesNo | null;
}

export interface OffsetLineItem {
  id: string;
  label: string;
  amount: number;
  color: string;
  description: string;
  eligible: boolean;
}

export interface CalculationResult {
  totalTuition: number;
  programLabel: string;
  offsets: OffsetLineItem[];
  totalOffsets: number;
  estimatedOutOfPocket: number;
}

export interface WizardState {
  currentStep: number;
  answers: CalculatorAnswers;
  result: CalculationResult | null;
}

export type WizardAction =
  | { type: "SET_ANSWER"; field: keyof CalculatorAnswers; value: string }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "GO_TO_STEP"; step: number }
  | { type: "RESET" };
