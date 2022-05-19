import { NextFunction, Request, Response } from "express";
import { CreateAdPayload, Ad, UpdateAdPayload } from "@type/ad";
import { v4 as uuid } from "uuid";
import db from "@lib/knex";
import { connect } from "amqplib";

let open: any;

const wrapMessage = (value: any) => {
  const message = {
    destinationAddress: "rabbitmq://rabbitmq/Ad",
    headers: {},
    messageType: ["urn:message:reporting_microservice.Models:Ad"],
    message: {
      ...value,
    },
  };
  return message;
};

const sendMessage = async (ad: Ad) => {
  if (!open)
    open = connect(
      `amqp://${process.env.BROKER_USER}:${process.env.BROKER_PW}@${process.env.BROKER_URL}`
    );
  open
    .then((conn: any) => {
      return conn.createChannel();
    })
    .then((channel: any) => {
      return channel.assertQueue("Ad").then((ok: any) => {
        return channel.sendToQueue(
          "Ad",
          Buffer.from(
            JSON.stringify(
              wrapMessage({
                Id: ad.id,
                UserId: ad.userId,
                Time: ad.time,
                Payment: ad.payment,
              })
            )
          )
        );
      });
    })
    .catch(console.warn);
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = CreateAdPayload.parse(req.body);
  const ad: Ad = {
    id: uuid(),
    userId: req.get("X-User-Id") as string,
    ...data,
  };
  await db("ad").insert(ad);
  sendMessage(ad);
  res.status(201).send();
};

export const listAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //const userId = req.get("X-User-Id");
  //if (!userId) res.status(400).send();
  const ads: Ad[] = await db<Ad>("ad").select("*");
  res.json(ads).status(200);
};

export const listOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.get("X-Ad-Ids") as string;
  const ids: Array<string> = header?.split(";");

  const ad = await db("ad").select().whereIn("id", ids);
  res.json(ad).status(200);
};

export const update = async (req: Request, res: Response) => {
  const data = UpdateAdPayload.parse(req.body);
  const id = req.params.id;
  const ad = await db("ad").select().where({ id });
  if (!ad) throw new Error("ad_not_found");
  await db("ad")
    .where({ id })
    .update({ ...data });
  res.status(204).send();
};

export const deleteOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  const ad = await db("ad").select().where({ id });
  if (!ad) throw new Error("ad_not_found");
  await db("ad").where({ id }).delete();
  res.status(204).send();
};
