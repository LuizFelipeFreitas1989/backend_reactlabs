import { PartialType } from '@nestjs/mapped-types';
import { CreateProjetoDto } from './create-projeto.dto.js';

export class UpdateProjetoDto extends PartialType(CreateProjetoDto) {}
