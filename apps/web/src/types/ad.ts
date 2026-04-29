export type PropertyAd = {
    id: string;
    title: string;
    type: string;
    price: number;
    description: string | null;

    propertyCategory: string;
    apartmentType: string | null;
    squareMeters: number;
    energyClass: string;
    floor: string | null;
    bedrooms: number | null;
    bathrooms: number | null;
    constructionYear: number | null;
    renovationYear: number | null;
    condition: string | null;
    contactPhone: string;

    area: {
        placeId: string;
        mainText: string;
        secondaryText: string;
    };

    createdAt: string;
    updatedAt?: string;
};

export type PropertyAdResponse = {
    data?: PropertyAd;
    error?: string;
};