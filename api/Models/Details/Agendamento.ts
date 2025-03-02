import { ObjectId } from "mongodb";
import { Barbeiro } from "./Barbeiro";

export interface Agendamento {
    barbearia_id: ObjectId; // ID da barbearia
    barbearia: string;
    barbeiro:Barbeiro | "Sem Preferência";
    cliente_id: ObjectId; // ID do cliente
    data_agendada: Date;
    status: 'Confirmado' | 'Cancelado' | 'Concluído';
    observacoes: string;
    barbeiro_id: ObjectId; // ID do barbeiro
  }