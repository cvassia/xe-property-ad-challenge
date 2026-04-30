import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { PropertyAdForm } from "../components/PropertyAdForm";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<typeof import("react-router-dom")>(
        "react-router-dom"
    );

    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

function renderForm() {
    return render(
        <MemoryRouter>
            <PropertyAdForm />
        </MemoryRouter>
    );
}

describe("PropertyAdForm", () => {
    beforeEach(() => {
        mockNavigate.mockReset();
        vi.restoreAllMocks();
    });

    it("shows required validation errors on submit", async () => {
        const user = userEvent.setup();

        renderForm();

        await user.click(screen.getByRole("button", { name: /submit/i }));

        expect(await screen.findByText("Title is required.")).toBeInTheDocument();
        expect(screen.getByText("Please select a property type.")).toBeInTheDocument();
        expect(
            screen.getByText("Please select an area from the suggestions.")
        ).toBeInTheDocument();
        expect(screen.getByText("Price must be a valid number.")).toBeInTheDocument();
        expect(screen.getByText("Contact phone is required.")).toBeInTheDocument();
        expect(screen.getByText("Square meters must be a valid number.")).toBeInTheDocument();
        expect(screen.getByText("Energy class is required.")).toBeInTheDocument();
    });

    it("loads area suggestions and selects one", async () => {
        const user = userEvent.setup();

        vi.stubGlobal(
            "fetch",
            vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({
                    data: [
                        {
                            placeId: "place-athens",
                            mainText: "Athens",
                            secondaryText: "Ελλάδα",
                            label: "Athens, Ελλάδα"
                        }
                    ]
                })
            })
        );

        renderForm();

        await user.type(screen.getByRole("combobox", { name: /area/i }), "ath");

        expect(await screen.findByText("Athens")).toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: /athens/i }));

        expect(screen.getByRole("combobox", { name: /area/i })).toHaveValue(
            "Athens, Ελλάδα"
        );
    });

    it("does not search areas before 3 characters", async () => {
        const user = userEvent.setup();

        const fetchMock = vi.fn();
        vi.stubGlobal("fetch", fetchMock);

        renderForm();

        await user.type(screen.getByRole("combobox", { name: /area/i }), "at");

        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("uploads selected media after creating the ad", async () => {
        const user = userEvent.setup();

        const fetchMock = vi.fn();

        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                data: [
                    {
                        placeId: "place-athens",
                        mainText: "Athens",
                        secondaryText: "Ελλάδα",
                        label: "Athens, Ελλάδα"
                    }
                ]
            })
        });

        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                data: {
                    id: "ad-123"
                }
            })
        });

        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                data: [
                    {
                        id: "media-1",
                        url: "/uploads/photo.jpg",
                        type: "image",
                        filename: "photo.jpg"
                    }
                ]
            })
        });

        vi.stubGlobal("fetch", fetchMock);

        renderForm();

        await user.type(screen.getByLabelText(/title/i), "Sunny apartment");
        await user.selectOptions(screen.getByLabelText(/^type/i), "buy");

        await user.type(screen.getByRole("combobox", { name: /area/i }), "ath");
        await user.click(await screen.findByRole("button", { name: /athens/i }));

        await user.type(screen.getByLabelText(/price in euros/i), "120000");
        await user.type(screen.getByLabelText(/contact phone/i), "+30 691 234 5678");

        await user.selectOptions(screen.getByLabelText(/property category/i), "apartment");
        await user.type(screen.getByLabelText(/square meters/i), "85");
        await user.selectOptions(screen.getByLabelText(/energy class/i), "B");

        const file = new File(["fake image"], "photo.jpg", { type: "image/jpeg" });

        await user.upload(screen.getByLabelText(/photos or videos/i), file);

        await user.click(screen.getByRole("button", { name: /submit/i }));

        expect(fetchMock).toHaveBeenCalledWith(
            "/api/uploads/ads/ad-123/media",
            expect.objectContaining({
                method: "POST",
                body: expect.any(FormData)
            })
        );

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/ads/ad-123");
        });
    });

    it("creates an ad and redirects to the details page", async () => {
        const user = userEvent.setup();

        const fetchMock = vi.fn();

        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                data: [
                    {
                        placeId: "place-athens",
                        mainText: "Athens",
                        secondaryText: "Ελλάδα",
                        label: "Athens, Ελλάδα"
                    }
                ]
            })
        });

        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                data: {
                    id: "ad-123"
                }
            })
        });

        vi.stubGlobal("fetch", fetchMock);

        renderForm();

        await user.type(screen.getByLabelText(/title/i), "Apartment");
        await user.selectOptions(screen.getByLabelText(/^type/i), "buy");

        await user.type(screen.getByRole("combobox", { name: /area/i }), "ath");
        await user.click(await screen.findByRole("button", { name: /athens/i }));

        await user.type(screen.getByLabelText(/price in euros/i), "120000");
        await user.type(screen.getByLabelText(/contact phone/i), "691 234 5678");

        await user.selectOptions(
            screen.getByLabelText(/property category/i),
            "apartment"
        );
        await user.type(screen.getByLabelText(/square meters/i), "85");
        await user.selectOptions(screen.getByLabelText(/energy class/i), "B");

        await user.click(screen.getByRole("button", { name: /submit/i }));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/ads/ad-123");
        });

        expect(fetchMock).toHaveBeenCalledWith(
            "/api/ads",
            expect.objectContaining({
                method: "POST"
            })
        );
    });
});