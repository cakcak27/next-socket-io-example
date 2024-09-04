"use server"
import { z } from "zod";
import { prisma } from "../utils/prisma";

const SignupFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters long." })
        .trim(),
    email: z.string().email({ message: "Please enter a valid email." }).trim(),
    password: z
        .string()
        .min(8, { message: "Be at least 8 characters long" })
        .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
        .regex(/[0-9]/, { message: "Contain at least one number." })
        .regex(/[^a-zA-Z0-9]/, {
            message: "Contain at least one special character.",
        })
        .trim(),
});

type FormState =
    | {
          errors?: {
              name?: string[];
              email?: string[];
              password?: string[];
          };
          message?: string;
      }
    | undefined;

export default async function signup(formState: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { data } = validatedFields

    console.log(validatedFields)
    await prisma.users.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password,
        },
    })


    return {
        message: "Signup successful!",
        data: validatedFields
    }
}
