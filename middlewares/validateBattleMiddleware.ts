import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export default function validateBattle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validateSchema = Joi.object({
    firstUser: Joi.string().required(),
    secondUser: Joi.string().required(),
  });
  const { error } = validateSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(422).send(error.details.map((detail) => detail.message));
  }
  next();
}
