import { Module } from '@nestjs/common';
import { CurriculumService } from './curriculum.service.js';
import { CurriculumController } from './curriculum.controller.js';

@Module({
  controllers: [CurriculumController],
  providers: [CurriculumService],
})
export class CurriculumModule {}
