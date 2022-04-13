import { NextFunction, Request, Response } from "express";
import db from "../lib/knex";
import { CreateRegistrationPayload, Registration } from "../types/registration";
import { v4 as uuid } from "uuid";

const registrationTable = "registration";

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
    userId: req.get("X-User-Id") as string,
    ...data,
  };
  await db(registrationTable).insert(registration);
  res.status(201).send();
};

export const listAllForUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.get("X-User-Id");
  const registrations: Registration[] = await db<Registration>(
    registrationTable
  )
    .select("id", "adId", "accepted", "closed", "userId")
    .where({ userId });

  res.json(registrations).status(200);
};

export const listOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const registration = await db<Registration>(registrationTable)
    .select("id", "adId", "accepted", "closed", "userId")
    .where({ id });
  res.json(registration).status(200);
};
