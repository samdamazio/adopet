import { Request, Response } from "express";

import type TipoPet from "../tipos/tipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/interfaces/InterfacePetRepository";
import PetEntity from "../entities/PetEntity";

const listaDePets: Array<TipoPet> = [];
let id: number = 0;

function geraId() {
  id = id + 1;
  return id;
}

class PetController {
  constructor(private repository: PetRepository) {}
  criaPet(req: Request, res: Response) {
    const { adotado, especie, nome, dataDeNascimento } = <PetEntity>req.body;
    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ message: "Espécie inválida" });
    }
    const novoPet: PetEntity = new PetEntity();
    novoPet.id = geraId();
    novoPet.nome = nome;
    novoPet.especie = especie;
    novoPet.adotado = adotado;
    novoPet.dataDeNascimento = dataDeNascimento;
    this.repository.criaPet(novoPet);
    return res.status(201).json(novoPet);
  }

  async listaPets(req: Request, res: Response) {
    const listaDePets = await this.repository.listaPets();
    return res.status(200).json(listaDePets);
  }

  atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, especie, adotado, dataDeNascimento } = <TipoPet>req.body;
    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ message: "Pet não encontrado" });
    }

    pet.nome = nome || pet.nome;
    pet.especie = especie || pet.especie;
    pet.adotado = adotado !== undefined ? adotado : pet.adotado;
    pet.dataDeNascimento = dataDeNascimento || pet.dataDeNascimento;
    return res.status(200).json(pet);
  }

  deletaPet(req: Request, res: Response) {
    const { id } = req.params;
    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ message: "Pet não encontrado" });
    }

    const index = listaDePets.indexOf(pet);
    listaDePets.splice(index, 1);
    return res.status(200).json({ message: "Pet deletado com sucesso" });
  }
}

export default PetController;
