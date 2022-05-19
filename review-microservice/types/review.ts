import { z } from "zod";

export type Review = {
  id: string;
  registrationId: string;
  stars: number;
  userId: string;
};

//default zod date only accepts javascript Date type, this way it can process date string from request body
const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date());

export const CreateReviewPayload = z.object({
  registrationId: z.string().uuid(),
  stars: z.number().min(1).max(5),
  time: dateSchema,
});
