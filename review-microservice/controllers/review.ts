import db from "@lib/knex";
import { CreateReviewPayload, Review } from "@type/review";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { connect } from "amqplib";

let open: any;

const wrapMessage = (value: any) => {
  const message = {
    destinationAddress: "rabbitmq://rabbitmq/Review",
    headers: {},
    messageType: ["urn:message:reporting_microservice.Models:Review"],
    message: {
      ...value,
    },
  };
  return message;
};

const sendMessage = async (review: Review, time: Date) => {
  if (!open)
    open = connect(
      `amqp://${process.env.BROKER_USER}:${process.env.BROKER_PW}@${process.env.BROKER_URL}`
    );
  open
    .then((conn: any) => {
      return conn.createChannel();
    })
    .then((channel: any) => {
      return channel.assertQueue("Review").then((ok: any) => {
        return channel.sendToQueue(
          "Review",
          Buffer.from(
            JSON.stringify(
              wrapMessage({
                Id: review.id,
                RegistrationId: review.registrationId,
                Stars: review.stars,
                UserId: review.userId,
                Time: time,
              })
            )
          )
        );
      });
    })
    .catch(console.warn);
};

export const create = async (req: Request, res: Response) => {
  const { time, ...data } = CreateReviewPayload.parse(req.body);
  const review: Review = {
    id: uuid(),
    userId: req.get("X-User-Id") as string,
    ...data,
  };
  await db("review").insert(review);
  sendMessage(review, time);
  res.status(201).send();
};

export const listOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  const review = await db("review")
    .select("id, registrationId, stars, userId")
    .where({ id });
  res.json(review).status(200);
};

export const listAllForUser = async (req: Request, res: Response) => {
  const userId = req.get("X-User-Id");
  const reviews: Review[] = await db<Review>("review")
    .select("id, registrationId, stars, userId")
    .where({ userId });
  res.json(reviews).status(200);
};
