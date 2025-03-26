import { MongoClient, Db, ObjectId } from "mongodb";
import { Barbearia } from "../Models/Barbearia";
import { configDotenv } from "dotenv";
import { Cliente } from "../Models/Cliente";

//Cache global
export let cachedData: Barbearia[];

configDotenv();

const client = new MongoClient(process.env.mongodb as string);
let alreadyConnected = false;
export const connectToDatabase = async (): Promise<{
  db: Db;
  client: MongoClient;
}> => {
  if (!alreadyConnected) {
    try {
      await client.connect();
      alreadyConnected = true;
      console.log("Conectado ao MongoDB");
      return {
        db: client.db("cortezziadb"),
        client: client,
      };
    } catch (err) {
      console.error(`Erro ao se conectar ao banco de dados: ${err}`);
      throw err; // Permite que a aplicação saiba que a conexão falhou
    }
  } else {
    console.log("Já conectado ao MongoDB");
    return {
      db: client.db("cortezziadb"),
      client: client,
    };
  }
};
export const disconnectFromDatabase = async (): Promise<void> => {
  if (alreadyConnected) {
    await client.close();
    alreadyConnected = false;
    console.log("Desconectado do MongoDB");
  }
};

const GetData = async (limit = 50, skip = 0) => {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("barbearias");
    const barbearias = await collection
      .find()
      .skip(skip)
      .limit(limit)
      .toArray();
    console.log(barbearias);

    return barbearias;
  } catch (error) {
    console.error("Erro ao acessar o banco de dados", error);
    throw error; // Repassa o erro para o próximo nível
  } finally {
    disconnectFromDatabase();
  }
};
export const UpdateCache = async () => {
  try {
    cachedData = (await GetData()) as Barbearia[];
    console.log("Cache Atualizado com Sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar o cache", error);
  }
};
setInterval(UpdateCache, 300000);
UpdateCache();
