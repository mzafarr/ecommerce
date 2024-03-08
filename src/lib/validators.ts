import { z } from "zod";

export const signUpValidator = z.object({
  email: z.string().email(),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type TSignUpValidator = z.infer<
  typeof signUpValidator
>;

export const signInValidator = z.object({
  email: z.string().email(),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type TSignInValidator = z.infer<
  typeof signUpValidator
>;
