import { PartialType } from '@nestjs/swagger';
import { CreateResearchAreaDto } from './create-research_area.dto.js';

export class UpdateResearchAreaDto extends PartialType(CreateResearchAreaDto) {}
