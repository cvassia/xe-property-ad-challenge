import { Router } from "express";
import { ValidationError } from "yup";
import { prisma } from "../db/prisma.js";
import { createAdSchema } from "../validation/adSchema.js";

export const adsRouter = Router();

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
                areaPlaceId: input.area.placeId,
                areaMainText: input.area.mainText,
                areaSecondaryText: input.area.secondaryText
            }
        });

        return response.status(201).json({
            data: {
                id: ad.id,
                title: ad.title,
                type: ad.type,
                price: ad.price,
                description: ad.description,
                area: {
                    placeId: ad.areaPlaceId,
                    mainText: ad.areaMainText,
                    secondaryText: ad.areaSecondaryText
                },
                createdAt: ad.createdAt
            }
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
            data: {
                id: ad.id,
                title: ad.title,
                type: ad.type,
                price: ad.price,
                description: ad.description,
                area: {
                    placeId: ad.areaPlaceId,
                    mainText: ad.areaMainText,
                    secondaryText: ad.areaSecondaryText
                },
                createdAt: ad.createdAt,
                updatedAt: ad.updatedAt
            }
        });
    } catch (error) {
        console.error("Get ad failed:", error);

        return response.status(500).json({
            error: "Could not load property ad."
        });
    }
});