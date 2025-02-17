import { ObjectId } from "mongodb";
import { Endereco } from "./Details/Endereço";
import { Servico } from "./Details/Servico";

export interface Cliente {
    _id: ObjectId;
    nome: string;
    telefone: string;
    email: string;
    endereco: Endereco;
    historico_agendamentos: Array<{
      agendamento_id: ObjectId;
      data: Date;
      servico: Servico;
      status: string;
    }>;
  }