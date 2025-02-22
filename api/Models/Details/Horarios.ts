export class Horarios {
  segunda: { abertura: string; fechamento: string };
  terca: { abertura: string; fechamento: string };
  quarta: { abertura: string; fechamento: string };
  quinta: { abertura: string; fechamento: string };
  sexta: { abertura: string; fechamento: string };
  sabado: { abertura: string; fechamento: string };
  domingo: { abertura: string; fechamento: string };

  constructor(
      segunda?: { abertura: string; fechamento: string },
      terca?: { abertura: string; fechamento: string },
      quarta?: { abertura: string; fechamento: string },
      quinta?: { abertura: string; fechamento: string },
      sexta?: { abertura: string; fechamento: string },
      sabado?: { abertura: string; fechamento: string },
      domingo?: { abertura: string; fechamento: string }
  ) {
      const defaultHorario = { abertura: "08:00", fechamento: "18:00" };
      this.segunda = segunda || defaultHorario;
      this.terca = terca || defaultHorario;
      this.quarta = quarta || defaultHorario;
      this.quinta = quinta || defaultHorario;
      this.sexta = sexta || defaultHorario;
      this.sabado = sabado || { abertura: "09:00", fechamento: "14:00" };
      this.domingo = domingo || { abertura: "Fechado", fechamento: "Fechado" };
  }
}
