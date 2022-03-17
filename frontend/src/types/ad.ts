export type NewAd = {
  time: Date;
  location: string;
  duration: string;
  payment: number;
  description: string;
};

export type Ad = NewAd & {
  id: string;
};
