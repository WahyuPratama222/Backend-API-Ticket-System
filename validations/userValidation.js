import { z } from "zod";

const createUserValidation = z.object({
  name: z.string("Nama harus diisi").min(1, { message: "Panjang nama minimal 1" }),
  email: z.email({ message: "Email tidak valid" }),
  password: z.string({ message: "Password harus diisi"}).min(8, { message: "Password minimal 8 karakter" }),
  role: z.enum(["customer", "organizer"], {
    message: "Role harus 'customer' atau 'organizer'",
  }),
});

const getUserByIdValidation = z.object({
  id: z.coerce.number().int().positive({
    message: "User ID harus bilangan bulat positif",
  }),
});

const patchUserValidation = createUserValidation
  .omit({ role: true })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Minimal satu field harus diupdate",
  });

export { createUserValidation, getUserByIdValidation, patchUserValidation };
