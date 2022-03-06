import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma";
import { CreateAdPayload, AdType, UpdateAdPayload } from "@type/ad";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = CreateAdPayload.parse(req.body);
  await prisma.ad.create({
    data: {
      ...data,
    },
  });
  res.json({ message: "succesful_creation" }).status(201);
};

export const listAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ads: AdType[] = await prisma.ad.findMany();
  res.json(ads).status(200);
};

export const update = async (req: Request, res: Response) => {
  const data = UpdateAdPayload.parse(req.body);
  const id = req.params.id;
  const ad = await prisma.ad.findUnique({ where: { id } });
  if (!ad) throw new Error("ad_not_found");
  await prisma.ad.update({ where: { id: id }, data: { ...data } });
  res.json({ message: "succesful_update" }).status(204);
};

export const deleteOne = async (req: Request, res: Response) => {
  const id = req.params.id;
  const ad = await prisma.ad.findUnique({ where: { id } });
  if (!ad) throw new Error("ad_not_found");
  await prisma.ad.delete({ where: { id } });
  res.json({ message: "succesful_delete" }).status(204);
};
