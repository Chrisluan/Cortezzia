import { MongoClient, Db, ObjectId } from "mongodb";
import { Servico } from "../Models/Details/Servico";
import { Barbearia } from "../Models/Barbearia";
import { configDotenv } from "dotenv";

configDotenv();
const client = new MongoClient(process.env.mongodb as string);

export const connectToDatabase = async (): Promise<Db> => {
  await client.connect();
  console.log("Conectado ao MongoDB");
  return client.db("cortezziadb");
};
export const disconnectFromDatabase = async (): Promise<void> => {
  await client.close();
  console.log("Desconectado do MongoDB");
};

// Criar um serviço e associá-lo a uma barbearia

// Criar uma barbearia



export const getCombined = async () => {
  try {
    const db = await connectToDatabase();
    const barbeariaCollection = db.collection<Barbearia>("barbearias");
  } catch (e) {
  } finally {
  }
};
// Criar um agendamento e associá-lo a uma barbearia e cliente

// Buscar todos os serviços de uma barbearia específica
export const getServicosByBarbearia = async (barbeariaId: string) => {
  const db = await connectToDatabase();
  const servicoCollection = db.collection<Servico>("servicos");

  // Converte a string para ObjectId
  const objectId = new ObjectId(barbeariaId);

  // Buscar os serviços da barbearia especificada
  const servicos = await servicoCollection
    .find({ barbearia_id: objectId })
    .toArray();
  return servicos;
};
