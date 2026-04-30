import * as yup from "yup";

export type PropertyAdFormValues = {
    title: string;
    type: string;
    price: number;
    description?: string;

    propertyCategory?: string;
    apartmentType?: string;
    squareMeters: number;
    energyClass: string;
    floor?: string;
    bedrooms?: number;
    bathrooms?: number;
    constructionYear?: number;
    renovationYear?: number;
    condition?: string;
    contactPhone: string;
};

const optionalPositiveInteger = yup
    .number()
    .transform((value, originalValue) => {
        return originalValue === "" || originalValue === null || Number.isNaN(value)
            ? undefined
            : value;
    })
    .typeError("Value must be a valid number.")
    .integer("Value must be a whole number.")
    .min(0, "Value cannot be negative.")
    .optional();

export const propertyAdSchema: yup.ObjectSchema<PropertyAdFormValues> =
    yup.object({
        title: yup
            .string()
            .trim()
            .required("Title is required.")
            .max(155, "Title must be 155 characters or fewer."),

        type: yup
            .string()
            .oneOf(
                ["rent", "buy", "exchange", "auction"],
                "Please select a property type."
            )
            .required("Please select a property type."),

        price: yup
            .number()
            .typeError("Price must be a valid number.")
            .required("Price is required.")
            .positive("Price must be greater than 0.")
            .integer("Price must be a whole number."),

        description: yup.string().trim().optional(),

        propertyCategory: yup
            .string()
            .trim()
            .optional(),

        apartmentType: yup.string().trim().optional(),

        squareMeters: yup
            .number()
            .typeError("Square meters must be a valid number.")
            .required("Square meters are required.")
            .positive("Square meters must be greater than 0.")
            .integer("Square meters must be a whole number."),

        energyClass: yup.string().trim().required("Energy class is required."),

        floor: yup.string().trim().optional(),

        bedrooms: optionalPositiveInteger,

        bathrooms: optionalPositiveInteger,

        constructionYear: optionalPositiveInteger,

        renovationYear: optionalPositiveInteger,

        condition: yup.string().trim().optional(),

        contactPhone: yup
            .string()
            .trim()
            .required("Contact phone is required.")
            .matches(
                /^[+0-9\s()-]{8,20}$/,
                "Contact phone must be a valid phone number."
            )
    });