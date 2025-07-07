import express from "express";
import petRouter from "./petRouter";

const app = express();

const router = (app: express.Application) => {
  app.use("/pets", petRouter);
};

router(app);

app.listen(3000, () => {
  console.log("Servidor em execução na porta 3000");
});

export default router;
