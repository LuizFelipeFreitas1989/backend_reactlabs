import { Module } from '@nestjs/common';
import { ResearchAreaService } from './research_area.service.js';
import { ResearchAreaController } from './research_area.controller.js';

@Module({
  controllers: [ResearchAreaController],
  providers: [ResearchAreaService],
})
export class ResearchAreaModule {}
