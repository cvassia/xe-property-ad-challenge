import cors from "cors";
import express from "express";
import { adsRouter } from "./routes/ads.js";
import { areasRouter } from "./routes/areas.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { uploadsRouter } from "./routes/uploads.js";


export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDir = path.dirname(currentFilePath);
  const uploadsDir = path.resolve(currentDir, "../uploads");

  app.use("/uploads", express.static(uploadsDir));

  app.get("/api/health", (_request, response) => {
    response.status(200).json({
      status: "ok",
      service: "xe-property-ad-api"
    });
  });


  app.use("/api/areas", areasRouter);
  app.use("/api/ads", adsRouter);
  app.use("/api/uploads", uploadsRouter);

  return app;
}