import db from "@lib/knex";
import { CreateReviewPayload, Review } from "@type/review";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

export const create = async (req: Request, res: Response) => {
  const data = CreateReviewPayload.parse(req.body);
  const review: Review = {
    id: uuid(),
    ...data,
  };
  await db("review").insert(review);
  res.status(201).send();
};

export const listOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  const review = await db("review")
    .select("id, registrationId, stars, username")
    .where({ id });
  res.json(review).status(200);
};

export const listAllForUser = async (req: Request, res: Response) => {
  const username = req.params.username;
  const reviews: Review[] = await db<Review>("review")
    .select("id, registrationId, stars, username")
    .where({ username });
  res.json(reviews).status(200);
};
