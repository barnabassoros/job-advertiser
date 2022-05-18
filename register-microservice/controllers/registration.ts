import { NextFunction, Request, Response } from "express";
import db from "../lib/knex";
import { CreateRegistrationPayload, Registration } from "../types/registration";
import { v4 as uuid } from "uuid";
import { connect } from "amqplib";

let open: any;

const wrapMessage = (value: any) => {
  const message = {
    destinationAddress: "rabbitmq://rabbitmq/Registration",
    headers: {},
    messageType: ["urn:message:reporting_microservice.Models:Registration"],
    message: {
      ...value,
    },
  };
  return message;
};

const sendMessage = async (registration: Registration) => {
  if (!open)
    open = connect(
      `amqp://${process.env.BROKER_USER}:${process.env.BROKER_PW}@${process.env.BROKER_URL}`
    );
  open
    .then((conn: any) => {
      return conn.createChannel();
    })
    .then((channel: any) => {
      return channel.assertQueue("Registration").then((ok: any) => {
        return channel.sendToQueue(
          "Registration",
          Buffer.from(
            JSON.stringify(
              wrapMessage({
                Id: registration.id,
                AdId: registration.adId,
                Closed: registration.closed,
                UserId: registration.userId,
              })
            )
          )
        );
      });
    })
    .catch(console.warn);
};

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
  sendMessage(registration);
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
