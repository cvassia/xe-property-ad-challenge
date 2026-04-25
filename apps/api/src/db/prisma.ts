import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);

dotenv.config({
    path: path.resolve(currentDir, "../../../../.env")
});

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required.");
}

const adapter = new PrismaBetterSqlite3({
    url: databaseUrl
});

export const prisma = new PrismaClient({
    adapter
});