export type NewReview = {
  registrationId: string;
  stars: number;
  username: string;
};

export type Review = NewReview & { id: string };
