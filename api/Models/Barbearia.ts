import { ObjectId } from "mongodb";
import { Endereco } from "./Details/Endereço";
import { Horarios } from "./Details/Horarios";
import { Servico } from "./Details/Servico";

export interface BarbeariaModel {
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
    servicos: Servico[];
}

export class Barbearia implements BarbeariaModel {
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
    servicos: Servico[];

    constructor(
        nome: string,
        descricao: string,
        telefone: string,
        email: string,
        endereco: Endereco,
        horarios: Horarios,
        imagem: string,
        social_media: { facebook: string; instagram: string },
        servicos: Servico[]
    ) {
        this._id = new ObjectId();
        this.nome = nome;
        this.descricao = descricao;
        this.telefone = telefone;
        this.email = email;
        this.endereco = endereco;
        this.horarios = horarios;
        this.imagem = imagem;
        this.social_media = social_media;
        this.servicos = servicos;
    }
}
