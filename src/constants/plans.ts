import { Plan } from "../types/subscription.type";

export const PLANS: Plan[] = [
  {
    id: "pro-month",
    name: "Pro",
    price: 19,
    period: "monthly",
    description:
      "For professionals who need advanced features and higher limits.",
    features: [
      "Unlimited projects",
      "Advanced analytics dashboard",
      "Priority email support",
      "Custom integrations",
      "API access with 10,000 requests/month",
      "Collaboration tools for up to 5 members",
    ],
    recommended: false,
    ctaText: "Upgrade to Pro",
    stripeProductId: "prod_Tru8RuCJGn2pUx",
  },
  {
    id: "lifetime",
    name: "Lifetime",
    price: 299,
    period: "one-time",
    description: "Pay once, use forever. Best value for long-term users.",
    features: [
      "Everything in Pro, forever",
      "Unlimited API requests",
      "Lifetime updates included",
      "Priority phone & email support",
      "Early access to new features",
      "Unlimited team members",
      "Custom onboarding session",
    ],
    recommended: true,
    ctaText: "Get Lifetime Access",
  },
] as const;
