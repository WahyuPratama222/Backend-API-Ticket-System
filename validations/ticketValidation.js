import { z } from "zod";

const getTicketByIdValidation = z.object({
  id: z.coerce
    .number()
    .int()
    .positive({ message: "Ticket ID harus bilangan bulat positif" }),
});

const markTicketUsedValidation = z.object({
  id: z.coerce
    .number()
    .int()
    .positive({ message: "Ticket ID harus bilangan bulat positif" }),
});

export { getTicketByIdValidation, markTicketUsedValidation };
