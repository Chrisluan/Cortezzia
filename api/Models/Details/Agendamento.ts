import { ObjectId } from "mongodb";

export interface Agendamento {
    _id: ObjectId;
    barbearia_id: ObjectId; // ID da barbearia
    cliente_id: ObjectId; // ID do cliente
    servico_id: ObjectId; // ID do serviço
    data_agendada: Date;
    status: 'Confirmado' | 'Cancelado' | 'Concluído';
    observacoes: string;
    barbeiro_id: ObjectId; // ID do barbeiro
  }