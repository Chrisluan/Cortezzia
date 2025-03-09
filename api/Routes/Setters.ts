import { Cliente } from './../Models/Cliente';
const { Router } = require("express");
import { Request, Response } from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import { Barbearia, BarbeariaModel } from "../Models/Barbearia";
import { configDotenv } from "dotenv";
import {
  createBarbeariaWithUser,
  createUserWithData,
} from "../DBMethods/Create";
import { Horarios } from "../Models/Details/Horarios";
import { Endereco } from "../Models/Details/Endereço";
const router = Router();

router.post("/createbarbershop", async (req: Request, res: Response) => {
  try {
    const barberia: BarbeariaModel = await req.body;
    const user = await req.body.user;
    await createBarbeariaWithUser(barberia, user);
    res.status(201).json({ message: "Barbearia criada com sucesso!" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Erro ao criar barbearia", error: e });
  }
});

router.post("/registeruser", async (req: Request, res: Response) => {
  const { email, password, name, ...clientData } = req.body;
  try {
    await createUserWithData(clientData as Cliente, {
      email: email,
      password: password,
      name: name,
    }, res);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
