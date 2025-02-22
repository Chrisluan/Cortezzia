export class Endereco {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;

  constructor(
      rua: string = "Rua Desconhecida",
      numero: string = "S/N",
      bairro: string = "Bairro Padrão",
      cidade: string = "Cidade Padrão",
      estado: string = "Estado Padrão",
      cep: string = "00000-000"
  ) {
      this.rua = rua;
      this.numero = numero;
      this.bairro = bairro;
      this.cidade = cidade;
      this.estado = estado;
      this.cep = cep;
  }
}
