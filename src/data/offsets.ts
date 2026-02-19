export const OFFSETS = {
  americorps: {
    id: "americorps",
    label: "AmeriCorps Segal Education Award",
    amountPerAward: 7_395,
    color: "#499db6",
    description:
      "Each AmeriCorps service term earns a $7,395 Segal Education Award that can be applied directly to tuition.",
  },
  teachGrant: {
    id: "teachGrant",
    label: "TEACH Grant",
    amountPerYear: 1_886,
    maxYears: 2,
    maxTotal: 4_000,
    color: "#2E8B57",
    description:
      "Up to $1,886/year for half-time graduate students (half of the $3,772 full-time maximum). Requires a 3.25 GPA and a commitment to teach in a high-need field at a low-income school for 4 years. Converts to a federal loan if the obligation is not met.",
  },
  teacherLoanForgiveness: {
    id: "loanForgiveness",
    label: "Teacher Loan Forgiveness",
    standardAmount: 5_000,
    stemSpedAmount: 17_500,
    color: "#FF8C00",
    description:
      "Applied to federal student loan balances after 5 consecutive years of full-time teaching at a Title I school. Math, science, and special education teachers may qualify for up to $17,500.",
  },
  relayNeedBasedAid: {
    id: "relayAid",
    label: "Relay Need-Based Aid (avg.)",
    amount: 6_072,
    color: "#7B2D8E",
    description:
      "Average institutional aid distributed on a first-come, first-served basis. Actual amounts vary by individual circumstances.",
  },
} as const;
