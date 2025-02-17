import { ObjectId } from "mongodb";

export interface Servico {
    _id: ObjectId;
    barbearia_id: ObjectId;
    nome: string;
    descricao: string;
    preco: number;
    duracao_minutos: number;
    categoria: string;
  }