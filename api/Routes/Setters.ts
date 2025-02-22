const { Router } = require("express");
import { Request, Response } from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import { Barbearia, BarbeariaModel } from "../Models/Barbearia";
import { configDotenv } from "dotenv";
import { createBarbearia } from "../DBMethods/Create";
import { Horarios } from "../Models/Details/Horarios";
import { Endereco } from "../Models/Details/Endereço";
const router = Router();

router.get("/createbarbershop", async (req: Request, res: Response) => {
  try {
    const barberia:BarbeariaModel = await req.body;
    await createBarbearia(barberia, res);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
