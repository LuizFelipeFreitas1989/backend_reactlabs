import { PartialType } from '@nestjs/mapped-types';
import { CreateConferenciaDto } from './create-conferencia.dto.js';

export class UpdateConferenciaDto extends PartialType(CreateConferenciaDto) {}
