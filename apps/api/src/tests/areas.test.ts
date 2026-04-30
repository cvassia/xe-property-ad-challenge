import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "../app.js";

const app = createApp();

describe("areas routes", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("rejects area search input shorter than 3 characters", async () => {
        const response = await request(app)
            .get("/api/areas")
            .query({ input: "at" })
            .expect(400);

        expect(response.body.error).toBe("Input must be at least 3 characters long.");
    });

    it("returns area suggestions from the autocomplete service", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => [
                    {
                        placeId: "place-athens",
                        mainText: "Athens",
                        secondaryText: "Ελλάδα"
                    }
                ]
            })
        );

        const response = await request(app)
            .get("/api/areas")
            .query({ input: "ath" })
            .expect(200);

        expect(response.body.data).toEqual([
            {
                placeId: "place-athens",
                mainText: "Athens",
                secondaryText: "Ελλάδα",
                label: "Athens, Ελλάδα"
            }
        ]);
    });

    it("caches autocomplete suggestions for repeated normalized input", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => [
                {
                    placeId: "place-nafplio",
                    mainText: "Nafplio",
                    secondaryText: "Ελλάδα"
                }
            ]
        });

        vi.stubGlobal("fetch", fetchMock);

        const firstResponse = await request(app)
            .get("/api/areas")
            .query({ input: "naf" })
            .expect(200);

        const secondResponse = await request(app)
            .get("/api/areas")
            .query({ input: "NAF" })
            .expect(200);

        expect(firstResponse.body.data).toEqual([
            {
                placeId: "place-nafplio",
                mainText: "Nafplio",
                secondaryText: "Ελλάδα",
                label: "Nafplio, Ελλάδα"
            }
        ]);

        expect(secondResponse.body.data).toEqual(firstResponse.body.data);

        expect(fetchMock).toHaveBeenCalledTimes(1);
    });
});