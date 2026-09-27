export const SITE = {
  name: "Avdhoot Bane",
  role: "Financial Services Professional",
  tagline: "Clear thinking about money, for real families.",
  email: "hello@example.com",
};

export type Post = { slug: string; title: string; date: string; category: string; excerpt: string; body: string[] };

export const POSTS: Post[] = [
  {
    slug: "sip-vs-lumpsum",
    title: "SIP vs Lumpsum: Which one should you choose?",
    date: "2026-09-10",
    category: "Mutual Funds",
    excerpt: "Both routes build wealth. The right one depends on your cash flow, temperament and market timing.",
    body: [
      "A Systematic Investment Plan (SIP) lets you invest a fixed amount every month, averaging out your purchase cost over time.",
      "A lumpsum investment puts your entire amount to work at once. Historically, lumpsum wins when markets rise steadily, while SIP reduces regret in volatile markets.",
      "If you earn a monthly salary, SIP fits naturally. If you receive a bonus or inheritance, consider a Systematic Transfer Plan to stagger the entry.",
    ],
  },
  {
    slug: "emergency-fund-basics",
    title: "How big should your emergency fund be?",
    date: "2026-08-22",
    category: "Personal Finance",
    excerpt: "Six months of expenses is the rule of thumb, but your job stability and dependents matter more.",
    body: [
      "An emergency fund is money you can access within a day without losses. Savings accounts, sweep-in FDs and liquid funds work well.",
      "Salaried individuals with stable jobs can aim for 6 months of expenses. Self-employed people should aim for 9 to 12 months.",
      "Build it before you start investing aggressively. It protects your long-term investments from being withdrawn at the wrong time.",
    ],
  },
  {
    slug: "term-insurance-guide",
    title: "Term insurance: the simplest guide you'll read",
    date: "2026-07-30",
    category: "Insurance",
    excerpt: "Pure protection, low cost. Here is how to decide the cover amount and tenure.",
    body: [
      "Term insurance pays your family a fixed sum if you pass away during the policy term. There is no maturity benefit, which is why it is affordable.",
      "A common starting point is 10 to 15 times your annual income, plus outstanding loans.",
      "Choose a term that covers you until your dependents are financially independent, typically till age 60 or 65.",
    ],
  },
];

// Replace with your own YouTube video IDs (the part after v= in the URL)
export const VIDEOS = [
  { id: "Mxh5BbqRAzE", title: "Mutual funds explained for beginners" },
  { id: "gFQNPmLKj1k", title: "The power of compounding" },
  { id: "p7HKvqRI_Bo", title: "How to plan for retirement" },
  { id: "HNPbY6fSeo8", title: "Understanding index funds" },
  { id: "Xn7KWR9EOGQ", title: "Personal finance habits" },
  { id: "WEDIj9JBTC8", title: "Stock market basics" },
];
