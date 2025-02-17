import { ObjectId } from "mongodb";
import { Horarios } from "./Horarios";

export interface Barbeiro {
  _id: ObjectId;
  nome: string;
  especialidade: string;
  telefone: string;
  email: string;
  horarios: Horarios;
}
