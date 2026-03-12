export const OFFSETS = {
  americorps: {
    id: "americorps",
    label: "AmeriCorps Segal Education Award",
    amountPerAward: 7_395,
    color: "#2C49A4",
    description:
      "Each AmeriCorps service term earns a $7,395 Segal Education Award that can be applied directly to tuition.",
  },
  teachGrant: {
    id: "teachGrant",
    label: "TEACH Grant",
    amountPerYear: 1_886,
    maxYears: 2,
    maxTotal: 4_000,
    color: "#6D97C9",
    description:
      "Up to $1,886/year for half-time graduate students (half of the $3,772 full-time maximum). Requires a 3.25 GPA and a commitment to teach in a high-need field at a low-income school for 4 years. Converts to a federal loan if the obligation is not met.",
  },
  teacherLoanForgiveness: {
    id: "loanForgiveness",
    label: "Teacher Loan Forgiveness",
    standardAmount: 5_000,
    stemSpedAmount: 17_500,
    color: "#FFAC5F",
    description:
      "Applied to federal student loan balances after 5 consecutive years of full-time teaching at a Title I school. Math, science, and special education teachers may qualify for up to $17,500.",
  },
} as const;
