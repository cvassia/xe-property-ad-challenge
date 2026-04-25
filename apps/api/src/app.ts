import cors from "cors";
import express from "express";
import { adsRouter } from "./routes/ads.js";
import { areasRouter } from "./routes/areas.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_request, response) => {
    response.status(200).json({
      status: "ok",
      service: "xe-property-ad-api"
    });
  });

  app.use("/api/areas", areasRouter);
  app.use("/api/ads", adsRouter);

  return app;
}