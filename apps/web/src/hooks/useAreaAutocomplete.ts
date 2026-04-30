import { useEffect, useMemo, useState } from "react";
import type { AreaSuggestion } from "../types/area";
import { useDebouncedValue } from "./useDebouncedValue";

export function useAreaAutocomplete(selectedArea: AreaSuggestion | null) {
    const [areaInput, setAreaInput] = useState("");
    const [suggestions, setSuggestions] = useState<AreaSuggestion[]>([]);
    const [isLoadingAreas, setIsLoadingAreas] = useState(false);
    const [areaError, setAreaError] = useState("");
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const [areaValidationError, setAreaValidationError] = useState("");

    const debouncedAreaInput = useDebouncedValue(areaInput, 300);

    const shouldSearchAreas = useMemo(() => {
        return debouncedAreaInput.trim().length >= 3 && !selectedArea;
    }, [debouncedAreaInput, selectedArea]);

    useEffect(() => {
        if (!shouldSearchAreas) {
            setSuggestions([]);
            setIsLoadingAreas(false);
            setAreaError("");
            setActiveSuggestionIndex(-1);
            return;
        }

        const controller = new AbortController();

        async function loadAreas() {
            setIsLoadingAreas(true);
            setAreaError("");

            try {
                const params = new URLSearchParams({
                    input: debouncedAreaInput.trim()
                });

                const response = await fetch(`/api/areas?${params.toString()}`, {
                    signal: controller.signal
                });

                const result = (await response.json()) as {
                    data?: AreaSuggestion[];
                    error?: string;
                };

                if (!response.ok) {
                    throw new Error(result.error ?? "Could not load area suggestions.");
                }

                setSuggestions(result.data ?? []);
                setActiveSuggestionIndex(-1);
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") {
                    return;
                }

                setSuggestions([]);
                setAreaError("Could not load area suggestions. Please try again.");
                setActiveSuggestionIndex(-1);
            } finally {
                setIsLoadingAreas(false);
            }
        }

        void loadAreas();

        return () => {
            controller.abort();
        };
    }, [debouncedAreaInput, shouldSearchAreas]);

    return {
        areaInput,
        setAreaInput,
        debouncedAreaInput,
        suggestions,
        setSuggestions,
        isLoadingAreas,
        areaError,
        activeSuggestionIndex,
        setActiveSuggestionIndex,
        areaValidationError,
        setAreaValidationError
    };
}