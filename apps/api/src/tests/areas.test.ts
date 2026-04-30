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
});