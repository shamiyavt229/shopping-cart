import { z } from "zod";

export const ShippingSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes.")
    .refine((value) => value.split(/\s+/).filter(Boolean).length >= 2, {
      message: "Enter your first and last name.",
    }),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .email("Enter a valid email address."),
    phone: z
    .string()
    .trim()
    .min(1, "Enter your phone number.")
    .regex(
      /^\+?[\d\s()-]+$/,
      "Phone number can only include digits, spaces, +, (), and hyphens."
    )
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 15;
    }, {
      message: "Phone number must contain 10 to 15 digits.",
    }),
  address: z.string().trim().min(1, "Enter your street address."),
  city: z
    .string()
    .trim()
    .min(2, "Enter your city.")
    .regex(/^[a-zA-Z\s.'-]+$/, "City can only contain letters, spaces, periods, hyphens, and apostrophes."),
  postalCode: z
    .string()
    .trim()
    .min(3, "Enter your postal code.")
    .max(12, "Postal code must be 12 characters or fewer.")
    .regex(/^[a-zA-Z0-9\s-]+$/, "Postal code can only include letters, numbers, spaces, and hyphens."),
});

export type ShippingDetails = z.infer<typeof ShippingSchema>;

export const emptyShippingDetails: ShippingDetails = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
};
