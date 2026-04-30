import { useEffect, useRef } from "react";
import type React from "react";
import type { AreaSuggestion } from "../types/area";
import {
    AutocompleteWrapper,
    FieldErrorHint,
    FieldGroup,
    FieldHint,
    FieldLabel,
    FieldMessageArea,
    RequiredMark,
    SuggestionButton,
    SuggestionsList,
    TextInput
} from "../styles";

type AreaAutocompleteFieldProps = {
    areaInput: string;
    selectedArea: AreaSuggestion | null;
    suggestions: AreaSuggestion[];
    isLoadingAreas: boolean;
    areaError: string;
    areaValidationError: string;
    debouncedAreaInput: string;
    activeSuggestionIndex: number;
    onAreaInputChange: (value: string) => void;
    onAreaSelect: (area: AreaSuggestion) => void;
    onClearSuggestions: () => void;
    onActiveSuggestionIndexChange: (index: number | ((current: number) => number)) => void;
};

export function AreaAutocompleteField({
    areaInput,
    selectedArea,
    suggestions,
    isLoadingAreas,
    areaError,
    areaValidationError,
    debouncedAreaInput,
    activeSuggestionIndex,
    onAreaInputChange,
    onAreaSelect,
    onClearSuggestions,
    onActiveSuggestionIndexChange
}: AreaAutocompleteFieldProps) {
    const autocompleteRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleDocumentMouseDown(event: MouseEvent) {
            if (!autocompleteRef.current) {
                return;
            }

            if (!autocompleteRef.current.contains(event.target as Node)) {
                onClearSuggestions();
            }
        }

        document.addEventListener("mousedown", handleDocumentMouseDown);

        return () => {
            document.removeEventListener("mousedown", handleDocumentMouseDown);
        };
    }, [onClearSuggestions]);

    function handleAreaKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (suggestions.length === 0) {
            return;
        }

        if (event.key === "ArrowDown") {
            event.preventDefault();

            onActiveSuggestionIndexChange((currentIndex) => {
                if (currentIndex >= suggestions.length - 1) {
                    return 0;
                }

                return currentIndex + 1;
            });
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();

            onActiveSuggestionIndexChange((currentIndex) => {
                if (currentIndex <= 0) {
                    return suggestions.length - 1;
                }

                return currentIndex - 1;
            });
        }

        if (event.key === "Enter" && activeSuggestionIndex >= 0) {
            event.preventDefault();
            onAreaSelect(suggestions[activeSuggestionIndex]);
        }

        if (event.key === "Escape") {
            event.preventDefault();
            onClearSuggestions();
        }
    }

    return (
        <FieldGroup>
            <FieldLabel id="area-field-label">
                Area
                <RequiredMark>*</RequiredMark>
            </FieldLabel>

            <AutocompleteWrapper ref={autocompleteRef}>
                <TextInput
                    name="area"
                    type="text"
                    role="combobox"
                    aria-labelledby="area-field-label"
                    aria-autocomplete="list"
                    aria-expanded={suggestions.length > 0}
                    aria-controls="area-suggestions"
                    aria-activedescendant={
                        activeSuggestionIndex >= 0
                            ? `area-suggestion-${suggestions[activeSuggestionIndex].placeId}`
                            : undefined
                    }
                    aria-haspopup="listbox"
                    value={areaInput}
                    placeholder="Type at least 3 characters"
                    autoComplete="off"
                    onChange={(event) => onAreaInputChange(event.target.value)}
                    onKeyDown={handleAreaKeyDown}
                    aria-invalid={Boolean(areaValidationError)}
                />

                {suggestions.length > 0 && (
                    <SuggestionsList
                        id="area-suggestions"
                        role="listbox"
                        aria-label="Area suggestions"
                    >
                        {suggestions.map((area, index) => {
                            const isActive = index === activeSuggestionIndex;

                            return (
                                <li
                                    id={`area-suggestion-${area.placeId}`}
                                    key={area.placeId}
                                    role="option"
                                    aria-selected={isActive}
                                >
                                    <SuggestionButton
                                        type="button"
                                        $active={isActive}
                                        onMouseEnter={() => onActiveSuggestionIndexChange(index)}
                                        onClick={() => onAreaSelect(area)}
                                    >
                                        <strong>{area.mainText}</strong>
                                        <span>{area.secondaryText}</span>
                                    </SuggestionButton>
                                </li>
                            );
                        })}
                    </SuggestionsList>
                )}
            </AutocompleteWrapper>

            <FieldMessageArea>
                {isLoadingAreas ? (
                    <FieldHint>Loading area suggestions...</FieldHint>
                ) : areaError ? (
                    <FieldErrorHint>{areaError}</FieldErrorHint>
                ) : areaValidationError ? (
                    <FieldErrorHint>{areaValidationError}</FieldErrorHint>
                ) : !selectedArea &&
                    debouncedAreaInput.trim().length >= 3 &&
                    suggestions.length === 0 ? (
                    <FieldErrorHint>No area suggestions found.</FieldErrorHint>
                ) : null}
            </FieldMessageArea>
        </FieldGroup>
    );
}