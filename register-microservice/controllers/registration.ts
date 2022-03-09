import { NextFunction, Request, Response } from "express";
import db from "../lib/knex";
import { CreateRegistrationPayload, Registration } from "../types/registration";
import { v4 as uuid } from "uuid";
import axios from "axios";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = CreateRegistrationPayload.parse(req.body);
  const registration: Registration = {
    id: uuid(),
    accepted: false,
    closed: false,
    ...data,
  };
  await db("registration").insert(registration);
  res.status(201).send();
};

export const listAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const registrations: Registration[] = await db<Registration>(
    "registration"
  ).select("*");
  const requests = registrations.map((registration) => {
    return axios.get("app_ad:3000/ad/", {
      params: {
        id: registration.adId,
      },
    });
  });
  const results = await Promise.all(requests);
  const extendedRegistrations = registrations.map((registration) => {
    const ad = results.filter((result) => result.data.id === registration.adId);
    return {
      ...registration,
      ...ad,
    };
  });
  res.json(extendedRegistrations).status(200);
};
