import { z } from "zod";

export type Review = {
  id: string;
  registrationId: string;
  stars: number;
  userId: string;
};

export const CreateReviewPayload = z.object({
  registrationId: z.string().uuid(),
  stars: z.number().min(1).max(5),
});
