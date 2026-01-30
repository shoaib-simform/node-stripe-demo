import { Request, Response, Router } from "express";

import { stripe } from "../lib/stripe";

const router = Router();

router.post("/purchase", async (req: Request, res: Response) => {
  const { priceId } = req.body;

  if (!priceId) {
    return res.status(400).json({ error: "Price ID is required" });
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:5173/?success=true`,
  });

  if (!session.url) {
    return res.status(500).json({ error: "Failed to create checkout session" });
  }

  return res.json({ url: session.url });
});

export default router;
