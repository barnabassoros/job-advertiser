export type NewReview = {
  registrationId: string;
  stars: number;
};

export type Review = NewReview & { id: string; userId: string };
