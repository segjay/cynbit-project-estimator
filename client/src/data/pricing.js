export const services = [
  {
    id: "ai",
    name: "AI Automation",
    basePrice: 30000,
    baseDays: 14,
    modules: [
      { id: "agents", name: "Autonomous Agents", price: 40000, days: 14 },
      { id: "llm", name: "LLM Automation", price: 30000, days: 10 },
      { id: "voice", name: "AI Voice Agents", price: 50000, days: 18 },
      { id: "integration", name: "AI Stack Integration", price: 25000, days: 8 },
    ],
  },
  {
    id: "it",
    name: "Custom IT Services",
    basePrice: 40000,
    baseDays: 20,
    modules: [
      { id: "fullstack", name: "Full-Stack Dev", price: 60000, days: 30 },
      { id: "backend", name: "Backend Systems", price: 40000, days: 20 },
      { id: "cloud", name: "Cloud Infrastructure", price: 35000, days: 12 },
      { id: "legacy", name: "Legacy Migration", price: 50000, days: 25 },
    ],
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    basePrice: 15000,
    baseDays: 7,
    modules: [
      { id: "ads", name: "Performance Ads", price: 20000, days: 7 },
      { id: "seo", name: "Technical SEO", price: 18000, days: 10 },
      { id: "crm", name: "CRM Automation", price: 25000, days: 12 },
      { id: "funnel", name: "Funnel Optimization", price: 22000, days: 10 },
    ],
  },
];

export const URGENT_MULTIPLIER = 1.3;
export const URGENT_DAYS_MULTIPLIER = 0.7;