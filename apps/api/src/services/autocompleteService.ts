import { env } from "../config/env.js";
import { TtlCache } from "./cacheService.js";
import type { AreaSuggestion, ExternalAreaSuggestion } from "../types/area.js";

const autocompleteCache = new TtlCache<AreaSuggestion[]>(
    env.autocompleteCacheTtlSeconds
);

function normalizeCacheKey(input: string) {
    return input.trim().toLowerCase();
}

export async function searchAreas(input: string): Promise<AreaSuggestion[]> {
    const cacheKey = normalizeCacheKey(input);
    const cachedAreas = autocompleteCache.get(cacheKey);

    if (cachedAreas) {
        return cachedAreas;
    }

    const url = new URL(env.autocompleteApiUrl);
    url.searchParams.set("input", input);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Autocomplete API failed with status ${response.status}`);
    }

    const data = (await response.json()) as ExternalAreaSuggestion[];

    if (!Array.isArray(data)) {
        throw new Error("Autocomplete API returned an invalid response.");
    }

    const areas = data.map((item) => ({
        placeId: item.placeId,
        mainText: item.mainText,
        secondaryText: item.secondaryText,
        label: `${item.mainText}, ${item.secondaryText}`
    }));

    autocompleteCache.set(cacheKey, areas);

    return areas;
}