import { NextFunction, Request, Response } from "express";
import db from "../lib/knex";
import { CreateRegistrationPayload, Registration } from "../types/registration";
import { v4 as uuid } from "uuid";
import axios from "axios";
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

export const listAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const registrations: Registration[] = await db<Registration>(
    registrationTable
  ).select("*");
  const requests = registrations.map((registration) => {
    /*
    return axios.get(process.env.AD_MICROSERVICE_URL + "ad/", {
      params: {
        id: registration.adId,
      },
    });*/
    return fetch(
      process.env.AD_MICROSERVICE_URL + "ad/" + registration.adId
    ).then((response) => response.json());
  });
  const results = (await Promise.all(requests)) as any;
  const extendedRegistrations = registrations.map((registration, id) => {
    return {
      ad:results[id][0],
      ...registration,
    };
  });
  res.json(extendedRegistrations).status(200);
};

export const listOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const registration = await db<Registration>(registrationTable)
    .select("*")
    .where({ id });
  /* const ad = await axios.get(process.env.AD_MICROSERVICE_URL + "ad/", {
    params: {
      id: registration[0].adId,
    }, 
    

  });*/
  const response = await fetch(
    process.env.AD_MICROSERVICE_URL + "ad/" + registration[0].adId
  );

  const ad = (await response.json()) as any;

  const extendedRegistration = {
    ad:ad[0],
    ...registration[0],
  };
  res.json(extendedRegistration).status(200);
};
