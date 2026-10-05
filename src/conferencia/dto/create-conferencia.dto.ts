import { ApiProperty } from "@nestjs/swagger";

export class CreateConferenciaDto {
  @ApiProperty()
  acronimo: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  qualificacao: string;

  @ApiProperty()
  subtitulo: string;

  @ApiProperty()
  localizacao: string;

  @ApiProperty()
  data: string | Date;

  @ApiProperty()
  deadline: string | Date;

  @ApiProperty()
  link: string;
}

