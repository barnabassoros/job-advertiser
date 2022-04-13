import { z } from "zod";

export type Ad = {
  id: string;
  time: Date;
  location: string;
  duration: string;
  payment: number;
  description: string;
  userId: string;
};

//default zod date only accepts javascript Date type, this way it can process date string from request body
const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date());

export const CreateAdPayload = z.object({
  time: dateSchema,
  location: z.string(),
  duration: z.string(),
  payment: z.number(),
  description: z.string(),
});

export const UpdateAdPayload = z.object({
  time: dateSchema.optional(),
  location: z.string().optional(),
  duration: z.string().optional(),
  payment: z.number().optional(),
  description: z.string().optional(),
});
