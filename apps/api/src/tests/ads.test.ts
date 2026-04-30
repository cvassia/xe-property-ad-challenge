import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../app.js";
import { prisma } from "../db/prisma.js";

const app = createApp();

const validAdPayload = {
    title: "Apartment in Athens",
    type: "buy",
    price: 120000,
    description: "apartment near public transport.",
    propertyCategory: "apartment",
    apartmentType: "standard",
    squareMeters: 85,
    energyClass: "B",
    floor: "2",
    bedrooms: 2,
    bathrooms: 1,
    constructionYear: 2000,
    renovationYear: 2020,
    condition: "renovated",
    contactPhone: "6912345678",
    area: {
        placeId: "ChIJ8UNwBh-9oRQR3Y1mdkU1Nic",
        mainText: "Athens",
        secondaryText: "Ελλάδα"
    }
};

describe("ads routes", () => {
    beforeEach(async () => {
        await prisma.adMedia.deleteMany();
        await prisma.ad.deleteMany();
    });

    it("creates a valid property ad", async () => {
        const response = await request(app)
            .post("/api/ads")
            .send(validAdPayload)
            .expect(201);

        expect(response.body.data).toMatchObject({
            title: validAdPayload.title,
            type: validAdPayload.type,
            price: validAdPayload.price,
            description: validAdPayload.description,
            propertyCategory: validAdPayload.propertyCategory,
            apartmentType: validAdPayload.apartmentType,
            squareMeters: validAdPayload.squareMeters,
            energyClass: validAdPayload.energyClass,
            floor: validAdPayload.floor,
            bedrooms: validAdPayload.bedrooms,
            bathrooms: validAdPayload.bathrooms,
            constructionYear: validAdPayload.constructionYear,
            renovationYear: validAdPayload.renovationYear,
            condition: validAdPayload.condition,
            contactPhone: validAdPayload.contactPhone,
            area: validAdPayload.area
        });

        expect(response.body.data.id).toEqual(expect.any(String));
        expect(response.body.data.createdAt).toEqual(expect.any(String));
    });

    it("rejects an invalid property ad payload", async () => {
        const response = await request(app)
            .post("/api/ads")
            .send({
                ...validAdPayload,
                title: "",
                price: -10,
                area: undefined
            })
            .expect(400);

        expect(response.body.error).toBe("Validation failed.");
        expect(response.body.details).toEqual(expect.any(Array));
    });

    it("returns a persisted property ad by id", async () => {
        const createResponse = await request(app)
            .post("/api/ads")
            .send(validAdPayload)
            .expect(201);

        const adId = createResponse.body.data.id;

        const response = await request(app).get(`/api/ads/${adId}`).expect(200);

        expect(response.body.data).toMatchObject({
            id: adId,
            title: validAdPayload.title,
            type: validAdPayload.type,
            area: validAdPayload.area,
            media: []
        });
    });

    it("returns 404 for an unknown property ad", async () => {
        const response = await request(app)
            .get("/api/ads/unknown-id")
            .expect(404);

        expect(response.body.error).toBe("Property ad was not found.");
    });
});