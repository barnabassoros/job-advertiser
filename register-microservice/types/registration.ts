import { boolean, z } from "zod";

export type Registration = {
  id: string;
  adId: string;
  accepted: boolean;
  closed: boolean;
  userId: string;
};

export const CreateRegistrationPayload = z.object({
  adId: z.string().uuid(),
});
