import { Request, Response } from "express";
import { battleService, getAll } from "../services/battleService.js";

export async function battle(req: Request, res: Response) {
  const { firstUser, secondUser } = req.body;
  try {
    const response = await battleService(firstUser, secondUser);
    res.status(200).send(response);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function ranking(req: Request, res: Response) {
  try {
    const response = await getAll();
    res.status(200).send({
      fighters: response,
    });
  } catch (error) {
    res.sendStatus(500);
  }
}
