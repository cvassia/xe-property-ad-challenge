



// PropertyAddForm

export function formatPrice(price: number) {
    return new Intl.NumberFormat("el-GR", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0
    }).format(price);
}

export function formatPropertyType(type: string) {
    const labels: Record<string, string> = {
        rent: "Rent",
        buy: "Buy",
        auction: "Auction",
        exchange: "Exchange",
    };

    return labels[type] ?? type;
}

export function formatDate(value: string) {
    return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(new Date(value));
}

export function formatOptionalValue(value: string | number | null | undefined) {
    return value === null || value === undefined || value === ""
        ? "Not provided"
        : value;
}

export function formatCondition(value: string | null | undefined) {
    const labels: Record<string, string> = {
        renovated: "Renovated",
        needs_renovation: "Needs renovation",
        under_construction: "Under construction",
        unfinished: "Unfinished"
    };

    if (!value) {
        return "Not provided";
    }

    return labels[value] ?? value;
}

export function formatPropertyCategory(value: string) {
    const labels: Record<string, string> = {
        apartment: "Apartment",
        detached_house: "Detached house",
        maisonette: "Maisonette",
        commercial_building: "Commercial building",
        plot: "Plot",
        land: "Land",
        shop: "Shop",
        apartment_building: "Apartment building",
        office: "Office",
        hall: "Hall",
        warehouse: "Warehouse",
        industrial_space: "Industrial space",
        craft_space: "Craft space",
        parking: "Parking",
        villa: "Villa",
        island: "Island",
        air_residence: "Air residence",
        residential_complex: "Residential complex",
        bungalow: "Bungalow",
        farm_ranch: "Farm / ranch"
    };

    return labels[value] ?? value;
}