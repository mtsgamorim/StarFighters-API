import { Router } from "express";
import { battle, ranking } from "../controllers/battleController.js";
import validateBattle from "../middlewares/validateBattleMiddleware.js";

const route = Router();

route.post("/battle", validateBattle, battle);
route.get("/ranking", ranking);

export default route;
