import { ObjectId } from "mongodb";
import { Endereco } from "./Details/Endereço";
import { Horarios } from "./Details/Horarios";

export interface Barbearia {
    _id: ObjectId;
    nome: string;
    descricao: string;
    telefone: string;
    email: string;
    endereco: Endereco;
    horarios: Horarios;
    imagem: string;
    social_media: {
      facebook: string;
      instagram: string;
    };
  }