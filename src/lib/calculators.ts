export type Field = { key: string; label: string; min: number; max: number; step: number; value: number; suffix?: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Vals = any;
export type Result = { label: string; value: number; highlight?: boolean };
export type Calculator = { slug: string; name: string; blurb: string; fields: Field[]; compute: (v: Vals) => Result[] };

const sipFV = (m: number, r: number, y: number) => {
  const i = r / 1200, n = y * 12;
  return i === 0 ? m * n : m * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
};

export const CALCULATORS: Calculator[] = [
  {
    slug: "sip", name: "SIP Calculator", blurb: "Estimate the future value of your monthly investments.",
    fields: [
      { key: "m", label: "Monthly investment", min: 500, max: 200000, step: 500, value: 10000, suffix: "₹" },
      { key: "r", label: "Expected return (p.a.)", min: 1, max: 30, step: 0.5, value: 12, suffix: "%" },
      { key: "y", label: "Time period", min: 1, max: 40, step: 1, value: 10, suffix: "yrs" },
    ],
    compute: ({ m, r, y }) => { const fv = sipFV(m, r, y), inv = m * y * 12; return [
      { label: "Invested amount", value: inv }, { label: "Estimated returns", value: fv - inv }, { label: "Total value", value: fv, highlight: true }]; },
  },
  {
    slug: "lumpsum", name: "Lumpsum Calculator", blurb: "See how a one-time investment grows over time.",
    fields: [
      { key: "p", label: "Total investment", min: 5000, max: 10000000, step: 5000, value: 100000, suffix: "₹" },
      { key: "r", label: "Expected return (p.a.)", min: 1, max: 30, step: 0.5, value: 12, suffix: "%" },
      { key: "y", label: "Time period", min: 1, max: 40, step: 1, value: 10, suffix: "yrs" },
    ],
    compute: ({ p, r, y }) => { const fv = p * Math.pow(1 + r / 100, y); return [
      { label: "Invested amount", value: p }, { label: "Estimated returns", value: fv - p }, { label: "Total value", value: fv, highlight: true }]; },
  },
  {
    slug: "emi", name: "EMI Calculator", blurb: "Work out monthly instalments for home, car or personal loans.",
    fields: [
      { key: "p", label: "Loan amount", min: 50000, max: 20000000, step: 50000, value: 2500000, suffix: "₹" },
      { key: "r", label: "Interest rate (p.a.)", min: 1, max: 20, step: 0.1, value: 8.5, suffix: "%" },
      { key: "y", label: "Loan tenure", min: 1, max: 30, step: 1, value: 20, suffix: "yrs" },
    ],
    compute: ({ p, r, y }) => { const i = r / 1200, n = y * 12; const emi = (p * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1); return [
      { label: "Monthly EMI", value: emi, highlight: true }, { label: "Total interest", value: emi * n - p }, { label: "Total payment", value: emi * n }]; },
  },
  {
    slug: "fd", name: "FD Calculator", blurb: "Maturity value of a fixed deposit with quarterly compounding.",
    fields: [
      { key: "p", label: "Deposit amount", min: 5000, max: 10000000, step: 5000, value: 200000, suffix: "₹" },
      { key: "r", label: "Interest rate (p.a.)", min: 1, max: 12, step: 0.1, value: 7, suffix: "%" },
      { key: "y", label: "Tenure", min: 1, max: 10, step: 1, value: 5, suffix: "yrs" },
    ],
    compute: ({ p, r, y }) => { const fv = p * Math.pow(1 + r / 400, 4 * y); return [
      { label: "Principal", value: p }, { label: "Interest earned", value: fv - p }, { label: "Maturity value", value: fv, highlight: true }]; },
  },
  {
    slug: "retirement", name: "Retirement Calculator", blurb: "How large a corpus you need, and the monthly SIP to get there.",
    fields: [
      { key: "age", label: "Current age", min: 18, max: 60, step: 1, value: 30, suffix: "yrs" },
      { key: "ret", label: "Retirement age", min: 40, max: 75, step: 1, value: 60, suffix: "yrs" },
      { key: "exp", label: "Monthly expenses today", min: 10000, max: 500000, step: 5000, value: 50000, suffix: "₹" },
      { key: "inf", label: "Inflation", min: 2, max: 10, step: 0.5, value: 6, suffix: "%" },
      { key: "r", label: "Expected return (p.a.)", min: 4, max: 18, step: 0.5, value: 12, suffix: "%" },
    ],
    compute: ({ age, ret, exp, inf, r }) => { const y = Math.max(ret - age, 1); const future = exp * Math.pow(1 + inf / 100, y);
      const corpus = future * 12 * 25; const unit = sipFV(1, r, y); return [
      { label: "Monthly expense at retirement", value: future }, { label: "Corpus needed", value: corpus }, { label: "Monthly SIP required", value: corpus / unit, highlight: true }]; },
  },
  {
    slug: "goal", name: "Goal Planner", blurb: "Monthly SIP needed for education, a home or any future goal.",
    fields: [
      { key: "cost", label: "Goal cost today", min: 50000, max: 50000000, step: 50000, value: 2000000, suffix: "₹" },
      { key: "y", label: "Years to goal", min: 1, max: 30, step: 1, value: 12, suffix: "yrs" },
      { key: "inf", label: "Inflation", min: 2, max: 12, step: 0.5, value: 7, suffix: "%" },
      { key: "r", label: "Expected return (p.a.)", min: 4, max: 18, step: 0.5, value: 12, suffix: "%" },
    ],
    compute: ({ cost, y, inf, r }) => { const f = cost * Math.pow(1 + inf / 100, y); return [
      { label: "Future cost of goal", value: f }, { label: "Monthly SIP required", value: f / sipFV(1, r, y), highlight: true }]; },
  },
];

export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
