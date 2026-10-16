import { Module } from '@nestjs/common';
import { PersonService } from './person.service.js';
import { PersonController } from './person.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { CurriculumModule } from '../curriculum/curriculum.module.js';
import { CurriculumService } from '../curriculum/curriculum.service.js';

@Module({
  imports: [PrismaModule, CurriculumModule],
  controllers: [PersonController],
  providers: [PersonService, CurriculumService],
  exports: [PersonService],
})
export class PersonModule {}
