const { Router } = require("express");
import { Request, Response } from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import { configDotenv } from "dotenv";
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
setInterval(UpdateCache, 300000);
UpdateCache();
module.exports = router;
