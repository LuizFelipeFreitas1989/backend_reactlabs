import { Module } from '@nestjs/common';
import { PersonService } from './person.service.js';
import { PersonController } from './person.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule {}
