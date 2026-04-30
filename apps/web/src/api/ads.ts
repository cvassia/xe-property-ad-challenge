import type { PropertyAd, PropertyAdResponse } from "../types/ad";

export async function getPropertyAd(id: string): Promise<PropertyAd> {
    const response = await fetch(`/api/ads/${id}`);
    const result = (await response.json()) as PropertyAdResponse;

    if (!response.ok || !result.data) {
        throw new Error(result.error ?? "Could not load property ad.");
    }

    return result.data;
}

export async function uploadPropertyAdMedia(adId: string, files: File[]) {
    if (files.length === 0) {
        return [];
    }

    const formData = new FormData();

    files.forEach((file) => {
        formData.append("media", file);
    });

    const response = await fetch(`/api/uploads/ads/${adId}/media`, {
        method: "POST",
        body: formData
    });

    const result = (await response.json()) as {
        data?: unknown[];
        error?: string;
    };

    if (!response.ok) {
        throw new Error(result.error ?? "Could not upload media files.");
    }

    return result.data ?? [];
}