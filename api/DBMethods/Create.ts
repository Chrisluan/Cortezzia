import { Db, MongoClient, ObjectId } from "mongodb";
import { Barbearia } from "../Models/Barbearia";
import { cachedData, connectToDatabase, UpdateCache } from "./Basics";
import { Servico } from "../Models/Details/Servico";
import { Agendamento } from "../Models/Details/Agendamento";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { Cliente } from "../Models/Cliente";
export const createBarbeariaWithUser = async (
  barbearia: Barbearia,
  user: { email: string; password: string; role?: string },
  res?: Response
) => {
  const { db, client } = await connectToDatabase();
  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const barbeariaCollection = db.collection<Barbearia>("barbearias");
      const credenciaisCollection = db.collection("credenciais");

      // Criar a barbearia
      const barbeariaResult = await barbeariaCollection.insertOne(barbearia, {
        session,
      });
      const barbeariaId = barbeariaResult.insertedId;

      // Hash da senha do usuário
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Criar o usuário associado à barbearia
      const userWithBarbearia = {
        email: user.email,
        password: hashedPassword,
        role: user.role || "admin", // Define um papel padrão
        barbearia_id: barbeariaId,
      };

      await credenciaisCollection.insertOne(userWithBarbearia, { session });

      if (res) {
        res
          .status(201)
          .json({ message: "Barbearia e usuário criados com sucesso!" });
      }

      console.log("Barbearia e usuário criados:", barbeariaId);
      await UpdateCache();
      return barbeariaId;
    });
  } catch (e) {
    console.error("Erro ao criar barbearia e usuário:", e);
    if (res)
      res.status(500).json({ error: "Erro ao criar barbearia e usuário" });
    throw new Error(`Erro ao criar barbearia e usuário: ${e}`);
  } finally {
    await session.endSession();
  }
};

export const createUserWithData = async (
  data: Cliente,
  user: { email: string; password: string, name: string },
  res?: Response
) => {
  const { db, client } = await connectToDatabase();
  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      const userDataCollection = db.collection<Cliente>("user-data");
      const credenciaisCollection = db.collection("user-credentials");

      // Verifica se o usuário já existe pelo e-mail
      const existingUser = await credenciaisCollection.findOne({
        email: user.email,
      });
      

      if (existingUser) {
        if (res) {
          return res.status(400).json({ error: "Usuário já existe" });
        }
      
      }
      data.name = user.name;
      // Criar os dados do usuário
      const userResult = await userDataCollection.insertOne(data, { session });
      const userId = userResult.insertedId;

      // Hash da senha do usuário
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Criar o usuário associado
      const userWithData = {
        _id: new ObjectId(userId),
        email: user.email,
        name: user.name,
        password: hashedPassword,
      };

      await credenciaisCollection.insertOne(userWithData, { session });

      if (res) {
        res.status(201).json({ message: "Usuário criado com sucesso!" });
      }

      console.log("Usuário criado:", userId);
      return userId;
    });
  } catch (e) {
    console.error("Erro ao criar usuário e informações:", e);
    if (res)
      res.status(500).json({ error: "Erro ao criar usuário e informações" });
    throw new Error(`Erro ao criar usuário e informações: ${e}`);
  } finally {
    await session.endSession();
  }
};

export const createServico = async (servico: Servico[], barbeariaId: string) => {
  const { db } = await connectToDatabase();
  const servicoCollection = db.collection<Servico>("servicos");
  // Converte a string para ObjectId
  const objectId = new ObjectId(barbeariaId);

  // Associa o serviço à barbearia
  const servicoComBarbearia = { ...servico, barbearia_id: objectId };

  const result = await servicoCollection.insertMany(servicoComBarbearia);
  await UpdateCache();
  return result.insertedIds;
};

export const createAgendamento = async (
  agendamento: Agendamento,
  barbeariaId: string,
  clienteId: string
) => {
  const { db } = await connectToDatabase();
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
