import { useEffect, useState } from "react";
import { getPropertyAd } from "../api/ads";
import type { PropertyAd } from "../types/ad";

export function usePropertyAd(adId: string | undefined) {
    const [ad, setAd] = useState<PropertyAd | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadAd() {
            if (!adId) {
                setError("Could not load this property ad.");
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError("");

            try {
                const loadedAd = await getPropertyAd(adId);

                if (isMounted) {
                    setAd(loadedAd);
                }
            } catch {
                if (isMounted) {
                    setError("Could not load this property ad.");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        void loadAd();

        return () => {
            isMounted = false;
        };
    }, [adId]);

    return {
        ad,
        isLoading,
        error
    };
}