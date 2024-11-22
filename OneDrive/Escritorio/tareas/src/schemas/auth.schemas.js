import { z } from "zod"; //validar datos

export const registerSchema = z.object({
  nombre: z.string({ required_error: "nombre es requerido " }), // va a recibir un string
  email: z
    .string({ required_error: "Email es requerido " })
    .email({ message: "email invalido" }),
  password: z
    .string({ required_error: "la contraseña es requerida" })
    .min(6, { message: "la contraseña debe ser de minimo 6 caracteres" }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "El email es requerido " })
    .email({ message: "email invalido" }),
  password: z.string({ required_error: "la contraseña es requerida" }).min(6, {
    required_error: "la contraseña debe ser de minimo 6 caracteres",
  }),
});
