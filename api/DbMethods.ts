import { MongoClient, Db, ObjectId } from "mongodb";
import { Servico } from "./Models/Details/Servico";
import { Barbearia } from "./Models/Barbearia";
import { Agendamento } from "./Models/Details/Agendamento";

const client = new MongoClient(process.env.mongodb || "");

const connectToDatabase = async (): Promise<Db> => {
  await client.connect();
  console.log("Conectado ao MongoDB");
  return client.db("cortezzia");
};

// Criar um serviço e associá-lo a uma barbearia
export const createServico = async (servico: Servico, barbeariaId: string) => {
  const db = await connectToDatabase();
  const servicoCollection = db.collection<Servico>("servicos");

  // Converte a string para ObjectId
  const objectId = new ObjectId(barbeariaId);

  // Associa o serviço à barbearia
  const servicoComBarbearia = { ...servico, barbearia_id: objectId };

  const result = await servicoCollection.insertOne(servicoComBarbearia);
  console.log("Serviço criado:", result.insertedId);
  return result.insertedId;
};

// Criar uma barbearia
export const createBarbearia = async (barbearia: Barbearia) => {
  const db = await connectToDatabase();
  const barbeariaCollection = db.collection<Barbearia>("barbearias");

  const result = await barbeariaCollection.insertOne(barbearia);
  console.log("Barbearia criada:", result.insertedId);
  return result.insertedId;
};

// Criar um agendamento e associá-lo a uma barbearia e cliente
export const createAgendamento = async (
  agendamento: Agendamento,
  barbeariaId: string,
  clienteId: string
) => {
  const db = await connectToDatabase();
  const agendamentoCollection = db.collection<Agendamento>("agendamentos");

  // Converte as strings para ObjectId
  const barbeariaObjectId = new ObjectId(barbeariaId);
  const clienteObjectId = new ObjectId(clienteId);

  // Associa o agendamento à barbearia e cliente
  const agendamentoComAssociacao = {
    ...agendamento,
    barbearia_id: barbeariaObjectId,
    cliente_id: clienteObjectId,
  };

  const result = await agendamentoCollection.insertOne(
    agendamentoComAssociacao
  );
  console.log("Agendamento criado:", result.insertedId);
  return result.insertedId;
};

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
