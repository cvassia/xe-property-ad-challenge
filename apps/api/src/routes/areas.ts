import { Router } from "express";
import { searchAreas } from "../services/autocompleteService.js";

export const areasRouter = Router();

areasRouter.get("/", async (request, response) => {
    const input = String(request.query.input ?? "").trim();

    if (input.length < 3) {
        return response.status(400).json({
            error: "Input must be at least 3 characters long."
        });
    }

    try {
        const areas = await searchAreas(input);

        return response.status(200).json({
            data: areas
        });
    } catch (error) {
        console.error("Autocomplete request failed:", error);

        return response.status(502).json({
            error: "Could not load area suggestions. Please try again."
        });
    }
});