import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  occupation: string;

  @ApiProperty()
  institution: string;

  @ApiProperty({ type: [String], required: false })
  tags?: string[];

  @ApiProperty()
  lattesCv: string;

  @ApiProperty()
  orcid: string;

  @ApiProperty()
  googleScholar: string;

  @ApiProperty()
  linkedIn: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  about: string;

  @ApiProperty({ type: [String], required: false })
  publicationIDs?: string[];
}
