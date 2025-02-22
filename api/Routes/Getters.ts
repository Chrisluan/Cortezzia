const { Router } = require("express");
import { Request, Response } from "express";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { configDotenv } from "dotenv";
import {
  createAgendamento,
  createBarbearia,
  createServico,
} from "../DBMethods/Create";
import { Barbearia } from "../Models/Barbearia";
import { setInterval } from "timers";
import { Servico } from "../Models/Details/Servico";
import { connectToDatabase, disconnectFromDatabase } from "../DBMethods/Basics";
const router = Router();

configDotenv();
let cachedData: string | any[] | null = [];

const GetData = async () => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("barbearias");
    const barbearias = await collection.find().toArray();
    await disconnectFromDatabase();
    return barbearias;
  } catch (error) {
    console.error("Erro ao acessar o banco de dados", error);
    await disconnectFromDatabase();
    throw error; // Repassa o erro para o próximo nível
  }
};
const UpdateCache = async () => {
  try {
    cachedData = await GetData();
    console.log("Cache Atualizado com Sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar o cache", error);
  }
};

router.get("/alldata", async (req: Request, res: Response) => {
  if (cachedData != null && cachedData.length > 0) {
    res.json(cachedData);
  }
});

router.get("/find", async (req: Request, res: Response) => {
  const { id } = req.body;
  const data = await GetData();
  const barberia = data.find((item) => item._id == id);
  res.json(barberia);
});

router.get("/log-in", async (req: Request, res: Response) => {
  const { email, password } = req.body;
});
setInterval(UpdateCache, 300000);
UpdateCache();
module.exports = router;
