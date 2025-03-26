import { MongoClient, Db } from "mongodb";
import { Barbearia } from "../Models/Barbearia";
import { configDotenv } from "dotenv";

// Cache global
export let cachedData: Barbearia[] = [];

configDotenv();

let dbInstance: Db | null = null;
let client: MongoClient | null = null;
let alreadyConnected = false;

export const connectToDatabase = async (): Promise<{ db: Db; client: MongoClient }> => {
  if (alreadyConnected && dbInstance && client) {
    console.log("Já conectado ao MongoDB");
    return { db: dbInstance, client };
  }

  try {
    client = new MongoClient(process.env.mongodb as string);
    await client.connect();
    dbInstance = client.db("cortezziadb");
    alreadyConnected = true;
    console.log("Conectado ao MongoDB");

    return { db: dbInstance, client };
  } catch (err) {
    console.error(`Erro ao conectar ao banco de dados: ${err}`);
    throw err;
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  if (alreadyConnected && client) {
    await client.close();
    alreadyConnected = false;
    console.log("Desconectado do MongoDB");
  }
};

const GetData = async (limit = 50, skip = 0): Promise<Barbearia[]> => {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("barbearias");
    const barbearias = await collection.find().skip(skip).limit(limit).toArray();

    console.log("Dados recuperados do MongoDB:", barbearias);
    return barbearias as Barbearia[];
  } catch (error) {
    console.error("Erro ao acessar o banco de dados", error);
    throw error;
  }
};

export const UpdateCache = async () => {
  console.log("Atualizando cache...");
  try {
    cachedData = await GetData();
    console.log("Cache atualizado com sucesso:", cachedData.length, "itens.");
  } catch (error) {
    console.error("Erro ao atualizar o cache", error);
  }
};

// Evita múltiplas execuções concorrentes do cache
let cacheUpdating = false;
setInterval(async () => {
  if (!cacheUpdating) {
    cacheUpdating = true;
    await UpdateCache();
    cacheUpdating = false;
  }
}, 300000); // Atualiza a cada 5 minutos

UpdateCache(); // Primeira execução imediata
