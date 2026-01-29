export type Plan = {
  id: string;
  name: string;
  price: number;
  period: "monthly" | "one-time";
  description: string;
  features: string[];
  recommended: boolean;
  ctaText: string;
  stripeProductId?: string;
};
