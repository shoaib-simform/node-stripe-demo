import "dotenv/config";
import express from "express";
import cors from "cors";

import subscriptionRoutes from "./routes/subscription.routes";
import coursesRoutes from "./routes/courses.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/subscription", subscriptionRoutes);
app.use("/api/courses", coursesRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
