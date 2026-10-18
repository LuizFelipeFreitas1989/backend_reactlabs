import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResearchAreaService } from './research_area.service.js';
import { CreateResearchAreaDto } from './dto/create-research_area.dto.js';
import { UpdateResearchAreaDto } from './dto/update-research_area.dto.js';

@Controller('research-area')
export class ResearchAreaController {
  constructor(private readonly researchAreaService: ResearchAreaService) {}

  @Post()
  create(@Body() createResearchAreaDto: CreateResearchAreaDto) {
    return this.researchAreaService.create(createResearchAreaDto);
  }

  @Get()
  findAll() {
    return this.researchAreaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.researchAreaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResearchAreaDto: UpdateResearchAreaDto) {
    return this.researchAreaService.update(+id, updateResearchAreaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.researchAreaService.remove(+id);
  }
}
