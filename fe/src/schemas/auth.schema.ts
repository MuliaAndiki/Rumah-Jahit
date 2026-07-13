import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username/Email wajib diisi"),
  password: z.string().min(1, "Kata sandi wajib diisi"),
});

// export const registerSchema = z.object({
//   name: z.string().min(2, "Nama minimal 2 karakter"),
//   email: z.string().email("Format email tidak valid"),
//   password: z.string().min(6, "Kata sandi minimal 6 karakter"),
// });

export type LoginFormValues = z.infer<typeof loginSchema>;
// export type RegisterFormValues = z.infer<typeof registerSchema>;
