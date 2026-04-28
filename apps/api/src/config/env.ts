import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);

dotenv.config();
dotenv.config({
    path: path.resolve(currentDir, "../../../../.env")
});

function getRequiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`${name} environment variable is required.`);
    }

    return value;
}

function getNumberEnv(name: string, fallback: number): number {
    const value = process.env[name];

    if (!value) {
        return fallback;
    }

    const parsedValue = Number(value);

    if (Number.isNaN(parsedValue) || parsedValue <= 0) {
        throw new Error(`${name} must be a positive number.`);
    }

    return parsedValue;
}

export const env = {
    apiPort: Number(process.env.API_PORT ?? 4000),
    autocompleteApiUrl: getRequiredEnv("AUTOCOMPLETE_API_URL"),
    autocompleteCacheTtlSeconds: getNumberEnv(
        "AUTOCOMPLETE_CACHE_TTL_SECONDS",
        3600
    )
};