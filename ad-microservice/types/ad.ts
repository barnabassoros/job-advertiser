import { z } from "zod";

export type CreateAdType = {
  time: Date;
  location: string;
  duration: string;
  payment: number;
  description: string;
};

export type AdType = CreateAdType & {
  id: string;
};

export const CreateAdPayload = z.object({
  time: z.string(),
  location: z.string(),
  duration: z.string(),
  payment: z.number(),
  description: z.string(),
});

export const UpdateAdPayload = z.object({
  time: z.string().optional(),
  location: z.string().optional(),
  duration: z.string().optional(),
  payment: z.number().optional(),
  description: z.string().optional(),
});
