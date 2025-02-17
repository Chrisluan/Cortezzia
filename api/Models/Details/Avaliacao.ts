import { ObjectId } from "mongodb";

export interface Avaliacao {
    _id: ObjectId;
    barbearia_id: ObjectId; // ID da barbearia
    cliente_id: ObjectId; // ID do cliente
    nota: number; // Nota de 1 a 5
    comentario: string;
    data: Date;
  }