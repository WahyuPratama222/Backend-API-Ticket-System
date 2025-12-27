import { z } from "zod";

const createBookingValidation = z.object({
  eventId: z.coerce
    .number()
    .int()
    .positive({ message: "Event ID harus bilangan bulat positif" }),
  quantity: z.coerce
    .number()
    .int()
    .min(1, { message: "Minimal pesan 1 tiket" }),
  holders: z.array(z.string().min(1)).optional(),
});

const getBookingByIdValidation = z.object({
  id: z.coerce
    .number()
    .int()
    .positive({ message: "Booking ID harus bilangan bulat positif" }),
});

export { createBookingValidation, getBookingByIdValidation }