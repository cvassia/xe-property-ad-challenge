import * as yup from "yup";

export type CreateAdInput = {
    title: string;
    type: "rent" | "buy" | "exchange" | "donation";
    price: number;
    description?: string;
    area: {
        placeId: string;
        mainText: string;
        secondaryText: string;
    };
};

export const createAdSchema: yup.ObjectSchema<CreateAdInput> = yup.object({
    title: yup
        .string()
        .trim()
        .required("Title is required.")
        .max(155, "Title must be 155 characters or fewer."),
    type: yup
        .mixed<CreateAdInput["type"]>()
        .oneOf(
            ["rent", "buy", "exchange", "donation"],
            "Please select a valid property type."
        )
        .required("Please select a valid property type."),
    price: yup
        .number()
        .typeError("Price must be a valid number.")
        .required("Price is required.")
        .positive("Price must be greater than 0.")
        .integer("Price must be a whole number."),
    description: yup.string().trim().optional(),
    area: yup
        .object({
            placeId: yup.string().trim().required("Area place ID is required."),
            mainText: yup.string().trim().required("Area name is required."),
            secondaryText: yup.string().trim().required("Area secondary text is required.")
        })
        .required("Area is required.")
});