import { Db, MongoClient, ObjectId } from "mongodb";
import { Barbearia } from "../Models/Barbearia";
import { connectToDatabase } from "./Basics";
import { Servico } from "../Models/Details/Servico";
import { Agendamento } from "../Models/Details/Agendamento";
import { Request, Response } from "express";
export const createBarbearia = async (barbearia: Barbearia, res?: Response) => {
  const db = await connectToDatabase();
  const barbeariaCollection = db.collection<Barbearia>("barbearias");

  try {
    const result = await barbeariaCollection.insertOne(barbearia);

    res && res.status(201).json({message:"Projeto Criado com Sucesso"});
    console.log("Barbearia criada:", result.insertedId);

    return result.insertedId;
  } catch (e) {
    return new Error(`Erro ao criar barbearia, ${e}`);
  }
};
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
};
