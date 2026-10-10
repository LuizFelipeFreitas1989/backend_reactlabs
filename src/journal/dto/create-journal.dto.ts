import { ApiProperty } from '@nestjs/swagger';

export class CreateJournalDto {
  @ApiProperty({ example: 'JESS' })
  acronym: string;

  @ApiProperty({ example: 'Journal of Empirical Software Studies' })
  name: string;

  @ApiProperty({ example: 'Northshore Academic Press' })
  publisher: string;

  @ApiProperty({ example: 'A1' })
  qualis: string;

  @ApiProperty({ example: 'Empirical studies, replications and open science' })
  topics: string;

  @ApiProperty({ example: 'https://journal.example.org' })
  link: string;
}
