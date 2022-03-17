import { Ad } from "./ad";

export type RegistrationWithoutAd = {
  id: string;
  adId: string;
  accepted: boolean;
  closed: boolean;
  username: string;
};


export type Registration = {
  id: string;
  adId: string;
  accepted: boolean;
  closed: boolean;
  username: string;
  ad: Ad;
};
