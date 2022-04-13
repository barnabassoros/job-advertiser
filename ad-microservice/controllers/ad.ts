import { NextFunction, Request, Response } from "express";
import { CreateAdPayload, Ad, UpdateAdPayload } from "@type/ad";
import { v4 as uuid } from "uuid";
import db from "@lib/knex";

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
  res.status(201).send();
};

export const listAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.get("X-User-Id");
  if (!userId) res.status(400).send();
  const ads: Ad[] = await db<Ad>("ad").where({ userId }).select("*");
  res.json(ads).status(200);
};

export const listOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ids: Array<string> = req.query.id as Array<string>;
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
