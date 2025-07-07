import express, { Response } from "express";
import "reflect-metadata";

import { AppDataSource } from "./config/dataSource";
import router from "./routes";

const app = express();
app.use(express.json());
router(app);

AppDataSource.initialize()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

export default app;
