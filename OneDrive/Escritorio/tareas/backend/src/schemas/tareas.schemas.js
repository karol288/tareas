import { z } from "zod";

export const crearTareaSchema = z.object({
  titulo: z.string({ required_error: "titulo es requerido" }),
  descripcion: z
    .string({
      required_error: "descripcion tiene que ser un caracter",
    })
    .optional(),
  fecha_finalizacion: z
    .string({ required_error: "fecha es requerida" })
    .datetime(), //duda
});
