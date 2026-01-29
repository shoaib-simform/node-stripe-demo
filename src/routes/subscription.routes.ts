import { Request, Response, Router } from "express";
import { Stripe } from "stripe";

import { stripe } from "../lib/stripe";
import { PLANS } from "../constants/plans";

const router = Router();

router.get("/plans", (_req: Request, res: Response) => {
  res.json({
    plans: PLANS,
  });
});

router.post("/create", async (req: Request, res: Response) => {
  const { planId, email } = req.body;

  if (!planId) {
    return res.status(400).json({ message: "planId is required." });
  }

  if (!email) {
    return res.status(400).json({ message: "email is required." });
  }

  const plan = PLANS.find((p) => p.id === planId);

  if (!plan) {
    return res.status(404).json({ message: "Plan not found." });
  }

  if (!stripe) {
    return res.status(500).json({ message: "Stripe is not configured." });
  }

  if (plan.period === "one-time") {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: plan.price * 100,
      currency: "usd",
    });

    return res.send({ clientSecret: paymentIntent.client_secret });
  }

  if (plan.period === "monthly") {
    if (!plan.stripeProductId) {
      return res.status(500).json({
        message: "Stripe Product ID is not configured for this plan.",
      });
    }

    const customer = await stripe.customers.create({ email });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            unit_amount: plan.price * 100,
            currency: "usd",
            recurring: { interval: "month" },
            product: plan.stripeProductId,
          },
        },
      ],
      payment_behavior: "default_incomplete",
      payment_settings: {
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice.confirmation_secret"],
    });

    const invoice = subscription.latest_invoice as Stripe.Invoice & {
      confirmation_secret: Stripe.Invoice.ConfirmationSecret;
    };

    return res.json({
      clientSecret: invoice.confirmation_secret.client_secret,
    });
  }

  return res.status(400).json({ message: "Invalid plan period." });
});

export default router;
