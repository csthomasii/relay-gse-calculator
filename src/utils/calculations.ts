import { PROGRAMS } from "../data/programs";
import { OFFSETS } from "../data/offsets";
import type {
  CalculatorAnswers,
  CalculationResult,
  OffsetLineItem,
} from "../types/calculator";

export function computeResult(answers: CalculatorAnswers): CalculationResult {
  const program = PROGRAMS[answers.program!];
  const totalTuition = program.cost;

  const offsets: OffsetLineItem[] = [];

  // AmeriCorps Segal Education Award
  let americorpsAwards = 0;
  let americorpsLabel = OFFSETS.americorps.label;
  if (answers.hasAmeriCorps === "already_served") {
    americorpsAwards = 1;
    americorpsLabel += " (1 award)";
  } else if (answers.hasAmeriCorps === "plan_to_enroll") {
    const estimatedYears = program.credits <= 21 ? 1 : 2;
    americorpsAwards = estimatedYears;
    americorpsLabel += ` (${estimatedYears} award${estimatedYears > 1 ? "s" : ""})`;
  }
  const americorpsAmount = americorpsAwards * OFFSETS.americorps.amountPerAward;
  const americorpsEligible = americorpsAmount > 0;
  offsets.push({
    id: OFFSETS.americorps.id,
    label: americorpsLabel,
    amount: americorpsAmount,
    color: OFFSETS.americorps.color,
    description: OFFSETS.americorps.description,
    eligible: americorpsEligible,
  });

  // TEACH Grant
  const teachGrantEligible = answers.teachGrantEligible === "yes";
  let teachGrantAmount = 0;
  if (teachGrantEligible) {
    const estimatedYears = program.credits <= 21 ? 1 : 2;
    teachGrantAmount = Math.min(
      OFFSETS.teachGrant.amountPerYear * estimatedYears,
      OFFSETS.teachGrant.maxTotal
    );
  }
  offsets.push({
    id: OFFSETS.teachGrant.id,
    label:
      OFFSETS.teachGrant.label +
      (teachGrantEligible
        ? ` (est. ${program.credits <= 21 ? "1 year" : "2 years"})`
        : ""),
    amount: teachGrantAmount,
    color: OFFSETS.teachGrant.color,
    description: OFFSETS.teachGrant.description,
    eligible: teachGrantEligible,
  });

  // Teacher Loan Forgiveness
  const qualifiesForForgiveness = answers.teachingDuration === "5_or_more";
  let forgivenessAmount = 0;
  let forgivenessLabel = OFFSETS.teacherLoanForgiveness.label;
  if (qualifiesForForgiveness) {
    const isStemOrSped = answers.subjectArea === "stem_sped";
    forgivenessAmount = isStemOrSped
      ? OFFSETS.teacherLoanForgiveness.stemSpedAmount
      : OFFSETS.teacherLoanForgiveness.standardAmount;
    forgivenessLabel += isStemOrSped ? " (STEM/SpEd)" : " (Standard)";
  }
  offsets.push({
    id: OFFSETS.teacherLoanForgiveness.id,
    label: forgivenessLabel,
    amount: forgivenessAmount,
    color: OFFSETS.teacherLoanForgiveness.color,
    description: OFFSETS.teacherLoanForgiveness.description,
    eligible: qualifiesForForgiveness,
  });

  const totalOffsets = offsets.reduce((sum, o) => sum + o.amount, 0);
  const estimatedOutOfPocket = Math.max(0, totalTuition - totalOffsets);

  return {
    totalTuition,
    programLabel: program.label,
    offsets,
    totalOffsets,
    estimatedOutOfPocket,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
