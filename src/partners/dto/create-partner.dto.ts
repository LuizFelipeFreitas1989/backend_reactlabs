import { ApiProperty } from '@nestjs/swagger';

export class CreatePartnerDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  websiteUrl: string;
}
