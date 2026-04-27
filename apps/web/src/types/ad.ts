export type PropertyAd = {
    id: string;
    title: string;
    type: string;
    price: number;
    description: string | null;
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