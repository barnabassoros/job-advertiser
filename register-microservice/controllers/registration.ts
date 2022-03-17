import { NextFunction, Request, Response } from "express";
import db from "../lib/knex";
import { CreateRegistrationPayload, Registration } from "../types/registration";
import { v4 as uuid } from "uuid";
import fetch from "node-fetch";

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
  const username = req.params.username;
  const registrations: Registration[] = await db<Registration>(
    registrationTable
  )
    .select("id", "adId", "accepted", "closed", "username")
    .where({ username });

  res.json(registrations).status(200);
};

export const listOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const registration = await db<Registration>(registrationTable)
    .select("id", "adId", "accepted", "closed", "username")
    .where({ id });
  res.json(registration).status(200);
};
