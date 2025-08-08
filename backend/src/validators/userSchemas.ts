import { z } from "zod";

// Esquemas para validación de usuarios
export const createUserSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email es requerido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(100, "La contraseña es demasiado larga"),
  firstName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre es demasiado largo")
    .trim(),
  lastName: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido es demasiado largo")
    .trim(),
  role: z.enum(["USER", "ADMIN"]).optional().default("USER"),
});

export const updateUserSchema = z.object({
  email: z.string().email("Email inválido").optional(),
  firstName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre es demasiado largo")
    .trim()
    .optional(),
  lastName: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(50, "El apellido es demasiado largo")
    .trim()
    .optional(),
  isActive: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Contraseña actual es requerida"),
  newPassword: z
    .string()
    .min(6, "La nueva contraseña debe tener al menos 6 caracteres")
    .max(100, "La nueva contraseña es demasiado larga"),
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email es requerido"),
  password: z.string().min(1, "Contraseña es requerida"),
});

// Esquemas para query parameters
export const userFiltersSchema = z.object({
  role: z.enum(["USER", "ADMIN"]).optional(),
  isActive: z
    .string()
    .transform((val) => val === "true")
    .pipe(z.boolean())
    .optional(),
  emailVerified: z
    .string()
    .transform((val) => val === "true")
    .pipe(z.boolean())
    .optional(),
  search: z.string().optional(),
});

export const paginationSchema = z.object({
  page: z
    .string()
    .transform((val) => parseInt(val, 10) || 1)
    .pipe(z.number().int().min(1))
    .optional(),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10) || 10)
    .pipe(z.number().int().min(1).max(100))
    .optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

// Schema para validar IDs en parámetros de ruta
export const idParamSchema = z.object({
  id: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().positive("ID debe ser un número positivo")),
});

// Tipos inferidos
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UserFiltersInput = z.infer<typeof userFiltersSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type IdParam = z.infer<typeof idParamSchema>;
