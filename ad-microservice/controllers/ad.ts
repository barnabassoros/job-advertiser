import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import prisma from "../lib/prisma";

type CreateAdType = {
  time: Date;
  location: string;
  duration: string;
  payment: number;
  description: string;
};

const CreateAdPayload = z.object({
  time: z.string(),
  location: z.string(),
  duration: z.string(),
  payment: z.number(),
  description: z.string(),
});

type AdType = CreateAdType & {
  id: string;
};

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
  res.json({ message: "succesful_creation" });
};

export const listAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ads: AdType[] = await prisma.ad.findMany();
  res.json(ads);
};
