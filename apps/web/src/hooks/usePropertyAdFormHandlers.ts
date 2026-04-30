import { useCallback } from "react";
import type { AreaSuggestion } from "../types/area";

type UsePropertyAdFormHandlersParams = {
    setSuggestions: React.Dispatch<React.SetStateAction<AreaSuggestion[]>>;
    setActiveSuggestionIndex: React.Dispatch<React.SetStateAction<number>>;
    setAreaInput: React.Dispatch<React.SetStateAction<string>>;
    setSelectedArea: React.Dispatch<React.SetStateAction<AreaSuggestion | null>>;
    setAreaValidationError: React.Dispatch<React.SetStateAction<string>>;
    setSelectedMediaFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

export function usePropertyAdFormHandlers({
    setSuggestions,
    setActiveSuggestionIndex,
    setAreaInput,
    setSelectedArea,
    setAreaValidationError,
    setSelectedMediaFiles
}: UsePropertyAdFormHandlersParams) {
    const clearAreaSuggestions = useCallback(() => {
        setSuggestions([]);
        setActiveSuggestionIndex(-1);
    }, [setSuggestions, setActiveSuggestionIndex]);

    function handleAreaChange(value: string) {
        setAreaInput(value);
        setSelectedArea(null);
        setAreaValidationError("");
        setActiveSuggestionIndex(-1);
    }

    function handleAreaSelect(area: AreaSuggestion) {
        setSelectedArea(area);
        setAreaInput(area.label);
        setSuggestions([]);
        setAreaValidationError("");
        setActiveSuggestionIndex(-1);
    }

    function handleMediaChange(files: FileList | null) {
        setSelectedMediaFiles(files ? Array.from(files) : []);
    }

    return {
        clearAreaSuggestions,
        handleAreaChange,
        handleAreaSelect,
        handleMediaChange
    };
}