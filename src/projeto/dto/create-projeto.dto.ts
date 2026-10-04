export class CreateProjetoDto {
  nome: string;
  subtitulo: string;
  descricao: string;
  status: string;
  tags?: string[];
  pesquisadores?: string[];
}

