import { z } from "zod";

const createEventValidation = z.object({
  title: z.string().min(1, { message: "Judul event wajib" }),
  location: z.string().min(1, { message: "Lokasi wajib" }),
  capacity: z.number().int().min(5, { message: "Kapasitas minimal 5" }),
  price: z.number().int().min(0, { message: "Harga tidak boleh negatif" }),
  date: z.coerce
    .date({ message: "Tanggal event tidak valid" })
    .refine((d) => d.getTime() > Date.now(), {
      message: "Tanggal event harus di masa depan",
    }),
});

const getEventByIdValidation = z.object({
  id: z.coerce.number().int().positive({
    message: "Event ID harus bilangan bulat positif",
  }),
});

const patchEventValidation = createEventValidation
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Minimal satu field harus diupdate",
  });

export { createEventValidation, getEventByIdValidation, patchEventValidation };
