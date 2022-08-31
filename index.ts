import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import battleRoutes from "./routes/battleRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(battleRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Funcionando da porta ${PORT}`);
});
