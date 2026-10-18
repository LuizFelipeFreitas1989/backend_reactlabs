import { Injectable } from '@nestjs/common';
import { CreateResearchAreaDto } from './dto/create-research_area.dto.js';
import { UpdateResearchAreaDto } from './dto/update-research_area.dto.js';

@Injectable()
export class ResearchAreaService {
  create(createResearchAreaDto: CreateResearchAreaDto) {
    return 'This action adds a new researchArea';
  }

  findAll() {
    return `This action returns all researchArea`;
  }

  findOne(id: number) {
    return `This action returns a #${id} researchArea`;
  }

  update(id: number, updateResearchAreaDto: UpdateResearchAreaDto) {
    return `This action updates a #${id} researchArea`;
  }

  remove(id: number) {
    return `This action removes a #${id} researchArea`;
  }
}
