import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);

dotenv.config({
    path: path.resolve(currentDir, "../../.env")
});

dotenv.config({
    path: path.resolve(currentDir, ".env")
});

export default defineConfig({
    schema: path.join(currentDir, "prisma/schema.prisma"),
    migrations: {
        path: path.join(currentDir, "prisma/migrations")
    },
    datasource: {
        url: env("DATABASE_URL")
    }
});