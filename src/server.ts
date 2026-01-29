import "dotenv/config";
import express from "express";
import cors from "cors";

import subscriptionRoutes from "./routes/subscription.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/subscription", subscriptionRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
