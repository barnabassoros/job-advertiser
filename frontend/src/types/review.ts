export type NewReview = {
  registrationId: string;
  stars: number;
  time: Date;
};

export type Review = {
  registrationId: string;
  stars: number;
  id: string;
  userId: string;
};
