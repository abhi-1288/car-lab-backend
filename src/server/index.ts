import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "./config";
import { apiLimiter } from "./middleware/ratelimit";
import { errorHandler } from "./middleware/error";
import routes from "./api/routes";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(apiLimiter);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/v1", routes);

app.use(errorHandler);

if (require.main === module) {
  app.listen(config.port, () => {
    console.log(`CarLab backend listening on ${config.port}`);
  });
}

export default app;
