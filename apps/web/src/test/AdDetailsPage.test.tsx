import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AdDetailsPage } from "../components/AdDetailsPage";

const mockAd = {
    id: "ad-123",
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
        placeId: "place-athens",
        mainText: "Athens",
        secondaryText: "Ελλάδα"
    },
    media: [
        {
            id: "media-1",
            url: "/uploads/photo-1.jpg",
            type: "image",
            filename: "photo-1.jpg"
        },
        {
            id: "media-2",
            url: "/uploads/photo-2.jpg",
            type: "image",
            filename: "photo-2.jpg"
        }
    ],
    createdAt: "2026-04-25T17:05:55.581Z",
    updatedAt: "2026-04-25T17:05:55.581Z"
};

function renderDetailsPage() {
    return render(
        <MemoryRouter initialEntries={["/ads/ad-123"]}>
            <Routes>
                <Route path="/ads/:adId" element={<AdDetailsPage />} />
            </Routes>
        </MemoryRouter>
    );
}

describe("AdDetailsPage", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("renders persisted ad details", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({
                    data: mockAd
                })
            })
        );

        renderDetailsPage();

        expect(await screen.findByText("Apartment in Athens")).toBeInTheDocument();
        expect(screen.getByText("Athens, Ελλάδα")).toBeInTheDocument();
        expect(screen.getByText("Apartment")).toBeInTheDocument();
        expect(screen.getByText("85 m²")).toBeInTheDocument();
        expect(screen.getByText("B")).toBeInTheDocument();
        expect(screen.getByText("apartment near public transport.")).toBeInTheDocument();
    });

    it("opens and closes the contact phone modal", async () => {
        const user = userEvent.setup();

        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({
                    data: mockAd
                })
            })
        );

        renderDetailsPage();

        await screen.findByText("Apartment in Athens");

        await user.click(screen.getByRole("button", { name: /show phone/i }));

        expect(screen.getByRole("dialog", { name: /contact phone/i })).toBeInTheDocument();
        expect(screen.getByText("6912345678")).toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: /close/i }));

        expect(
            screen.queryByRole("dialog", { name: /contact phone/i })
        ).not.toBeInTheDocument();
    });

    it("opens the media lightbox when a media item is clicked", async () => {
        const user = userEvent.setup();

        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({
                    data: mockAd
                })
            })
        );

        renderDetailsPage();

        const firstImage = await screen.findByAltText("Apartment in Athens media 1");

        await user.click(firstImage);

        expect(screen.getByText("1 / 2")).toBeInTheDocument();
    });

    it("shows an error message when the ad cannot be loaded", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: false,
                json: async () => ({
                    error: "Property ad was not found."
                })
            })
        );

        renderDetailsPage();

        expect(
            await screen.findByText("Could not load this property ad.")
        ).toBeInTheDocument();
    });
});