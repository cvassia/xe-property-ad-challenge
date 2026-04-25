import * as yup from "yup";

export type PropertyAdFormValues = {
    title: string;
    type: string;
    price: number;
    description?: string;
};

export const propertyAdSchema: yup.ObjectSchema<PropertyAdFormValues> = yup.object({
    title: yup
        .string()
        .trim()
        .required("Title is required.")
        .max(155, "Title must be 155 characters or fewer."),
    type: yup
        .string()
        .oneOf(
            ["rent", "buy", "exchange", "donation"],
            "Please select a property type."
        )
        .required("Please select a property type."),
    price: yup
        .number()
        .typeError("Price must be a valid number.")
        .required("Price is required.")
        .positive("Price must be greater than 0.")
        .integer("Price must be a whole number."),
    description: yup.string().trim().optional()
});