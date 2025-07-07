import express from "express";

import PetRepository from "../repositories/PetRepository";
import PetController from "../controllers/PetController";
import { AppDataSource } from "../config/dataSource";

const router = express.Router();
const petRepository = new PetRepository(
  AppDataSource.getRepository("PetEntity")
);

const petController = new PetController(petRepository);

router.post("/", petController.criaPet.bind(petController));
router.get("/", petController.listaPets.bind(petController));
router.put("/:id", petController.atualizaPet.bind(petController));
router.delete("/:id", petController.deletaPet.bind(petController));

export default router;
