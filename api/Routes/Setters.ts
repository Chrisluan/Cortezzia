const { Router } = require("express");
import { Request, Response } from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import { Barbearia, BarbeariaModel } from "../Models/Barbearia";
import { configDotenv } from "dotenv";
import { createBarbeariaWithUser } from "../DBMethods/Create";
import { Horarios } from "../Models/Details/Horarios";
import { Endereco } from "../Models/Details/Endereço";
const router = Router();

router.get("/createbarbershop", async (req: Request, res: Response) => {
  try {
    const barberia:BarbeariaModel = await req.body;
    await createBarbeariaWithUser(barberia, {
      email:"sla",
      password:"123",
      role:"member"
    });
    res.status(201).json({ message: "Barbearia criada com sucesso!" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Erro ao criar barbearia" });
  }
});

module.exports = router;
