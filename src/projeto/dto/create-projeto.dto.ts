import { ApiProperty } from "@nestjs/swagger";

export class CreateProjetoDto {
  @ApiProperty()
  nome: string;

  @ApiProperty()
  subtitulo: string;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  status: string;

  @ApiProperty({ type: [String], required: false })
  tags?: string[];

  @ApiProperty({ type: [String], required: false })
  pesquisadores?: string[];
  
  @ApiProperty({ required: false })
  parceiro?: string;

  @ApiProperty({ required: false })
  websiteUrl?: string;
}

