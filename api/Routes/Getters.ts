const { Router } = require("express");
import { Request, Response } from "express";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import { configDotenv } from "dotenv";
import { createBarbearia, createServico } from "../DbMethods";
import { Barbearia } from "../Models/Barbearia";
import { setInterval } from "timers";
import { Endereco } from "../Models/Details/Endereço";
import { Horarios } from "../Models/Details/Horarios";
import { Servico } from "../Models/Details/Servico";
const router = Router();

configDotenv();
let cachedData: string | any[] | null = [];

const client = new MongoClient(process.env.mongodb as string, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const GetData = async () => {
  try {
    client
      .connect()
      .then(() => console.log("Conectado ao banco de Dados"))
      .catch((err) =>
        console.error("Erro na conexão com o banco de dados", err)
      );

    const db = client.db("cortezziadb");
    const collection = db.collection("barbearias");
    const barbearias = await collection.find().toArray();

    return barbearias;
  } catch (error) {
    console.error("Erro ao acessar o banco de dados", error);
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
router.get("/createnew", async (req: Request, res: Response) => {
  const { id } = req.body;
  const servico:Servico = {
    _id: new ObjectId,
    barbearia_id: new ObjectId("67b29d7794d62a227cc086bb"),
    nome: "Teste",
    descricao: "teste",
    preco: 30.00,
    duracao_minutos: 20,
    categoria: "string"
  } as Servico
  try {
    await createServico(servico, "67b29d7794d62a227cc086bb");
  }catch(e){
    console.error("Erro ao criar uma nova barbearia", e);
  }
  res.json(servico);
  
});
setInterval(UpdateCache, 300000);
UpdateCache();
module.exports = router;
