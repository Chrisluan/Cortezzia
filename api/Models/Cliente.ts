import { ObjectId } from "mongodb";
import { Endereco } from "./Details/Endereço";
import { Servico } from "./Details/Servico";

export interface Cliente {
    _id: ObjectId ;
    name: string | "Não informado";
    phone: string | "Não informado";
    email?: string | "Não informado";
    address?: Endereco | "Não informado";
    history?: Array<{
      data: Date | "Não informado";
      servico: Servico | "Não informado";
      status: string | "Não informado";
    }>;
  }