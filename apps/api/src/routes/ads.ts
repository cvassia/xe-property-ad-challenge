import { Router } from "express";
import { ValidationError } from "yup";
import { prisma } from "../db/prisma.js";
import { createAdSchema } from "../validation/adSchema.js";

export const adsRouter = Router();

function mapAdToResponse(ad: {
    id: string;
    title: string;
    type: string;
    price: number;
    description: string | null;

    propertyCategory: string | null;
    apartmentType: string | null;
    squareMeters: number | null;
    energyClass: string | null;
    floor: string | null;
    bedrooms: number | null;
    bathrooms: number | null;
    constructionYear: number | null;
    renovationYear: number | null;
    condition: string | null;

    areaPlaceId: string;
    areaMainText: string;
    areaSecondaryText: string;

    createdAt: Date;
    updatedAt: Date;
}) {
    return {
        id: ad.id,
        title: ad.title,
        type: ad.type,
        price: ad.price,
        description: ad.description,

        propertyCategory: ad.propertyCategory,
        apartmentType: ad.apartmentType,
        squareMeters: ad.squareMeters,
        energyClass: ad.energyClass,
        floor: ad.floor,
        bedrooms: ad.bedrooms,
        bathrooms: ad.bathrooms,
        constructionYear: ad.constructionYear,
        renovationYear: ad.renovationYear,
        condition: ad.condition,

        area: {
            placeId: ad.areaPlaceId,
            mainText: ad.areaMainText,
            secondaryText: ad.areaSecondaryText
        },

        createdAt: ad.createdAt,
        updatedAt: ad.updatedAt
    };
}

adsRouter.post("/", async (request, response) => {
    try {
        const input = await createAdSchema.validate(request.body, {
            abortEarly: false,
            stripUnknown: true
        });

        const ad = await prisma.ad.create({
            data: {
                title: input.title,
                type: input.type,
                price: input.price,
                description: input.description || null,

                propertyCategory: input.propertyCategory,
                apartmentType: input.apartmentType || null,
                squareMeters: input.squareMeters,
                energyClass: input.energyClass,
                floor: input.floor || null,
                bedrooms: input.bedrooms ?? null,
                bathrooms: input.bathrooms ?? null,
                constructionYear: input.constructionYear ?? null,
                renovationYear: input.renovationYear ?? null,
                condition: input.condition || null,

                areaPlaceId: input.area.placeId,
                areaMainText: input.area.mainText,
                areaSecondaryText: input.area.secondaryText
            }
        });

        return response.status(201).json({
            data: mapAdToResponse(ad)
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return response.status(400).json({
                error: "Validation failed.",
                details: error.errors
            });
        }

        console.error("Create ad failed:", error);

        return response.status(500).json({
            error: "Could not create property ad."
        });
    }
});

adsRouter.get("/:id", async (request, response) => {
    try {
        const ad = await prisma.ad.findUnique({
            where: {
                id: request.params.id
            }
        });

        if (!ad) {
            return response.status(404).json({
                error: "Property ad was not found."
            });
        }

        return response.status(200).json({
            data: mapAdToResponse(ad)
        });
    } catch (error) {
        console.error("Get ad failed:", error);

        return response.status(500).json({
            error: "Could not load property ad."
        });
    }
});