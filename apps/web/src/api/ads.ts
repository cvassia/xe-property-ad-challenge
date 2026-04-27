import type { PropertyAd, PropertyAdResponse } from "../types/ad";

export async function getPropertyAd(id: string): Promise<PropertyAd> {
    const response = await fetch(`/api/ads/${id}`);
    const result = (await response.json()) as PropertyAdResponse;

    if (!response.ok || !result.data) {
        throw new Error(result.error ?? "Could not load property ad.");
    }

    return result.data;
}