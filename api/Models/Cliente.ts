import { ObjectId } from "mongodb";
import { Endereco } from "./Details/Endereço";
import { Servico } from "./Details/Servico";

export interface Cliente {
    _id: ObjectId ;
    nome: string | "Não informado";
    telefone: string | "Não informado";
    email?: string | "Não informado";
    endereco?: Endereco | "Não informado";
    historico_agendamentos?: Array<{
      data: Date | "Não informado";
      servico: Servico | "Não informado";
      status: string | "Não informado";
    }>;
  }