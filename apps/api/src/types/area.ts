export type ExternalAreaSuggestion = {
    placeId: string;
    mainText: string;
    secondaryText: string;
};

export type AreaSuggestion = ExternalAreaSuggestion & {
    label: string;
};