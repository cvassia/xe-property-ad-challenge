import { env } from "../config/env.js";
import type { AreaSuggestion, ExternalAreaSuggestion } from "../types/area.js";

export async function searchAreas(input: string): Promise<AreaSuggestion[]> {
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

    return data.map((item) => ({
        placeId: item.placeId,
        mainText: item.mainText,
        secondaryText: item.secondaryText,
        label: `${item.mainText}, ${item.secondaryText}`
    }));
}