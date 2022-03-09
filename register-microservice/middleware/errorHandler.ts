import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const errorHandler = (error:Error, req: Request, res: Response, next:NextFunction) => {
  if (error instanceof ZodError) {
    // type validation failed
    res.status(400).json({
      message: "type_validation_failed",
      data: error.message,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default errorHandler;
