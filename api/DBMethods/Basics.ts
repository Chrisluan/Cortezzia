import { MongoClient, Db, ObjectId } from "mongodb";
import { Barbearia } from "../Models/Barbearia";
import { configDotenv } from "dotenv";
import { Cliente } from "../Models/Cliente";
export let cachedData: Barbearia[];
configDotenv();

const client = new MongoClient(process.env.mongodb as string);

export const connectToDatabase = async () => {
  await client.connect();
  console.log("Conectado ao MongoDB");
  return {
    db: client.db("cortezziadb"),
    client: client,
  };
};
export const disconnectFromDatabase = async (): Promise<void> => {
  await client.close();
  console.log("Desconectado do MongoDB");
};

const GetData = async (limit = 50, skip = 0) => {
  try {
    const {db} = await connectToDatabase();
    const collection = db.collection("barbearias");
    const barbearias = await collection.find().skip(skip).limit(limit).toArray();
    return barbearias;
  } catch (error) {
    console.error("Erro ao acessar o banco de dados", error);
    throw error; // Repassa o erro para o próximo nível
  }
};
export const UpdateCache = async () => {
  try {
    cachedData = await GetData() as Barbearia[];
    console.log("Cache Atualizado com Sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar o cache", error);
  }
};
setInterval(UpdateCache, 300000);
UpdateCache();
