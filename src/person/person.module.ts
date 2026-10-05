import { Module } from '@nestjs/common';
import { PersonService } from './person.service.js';
import { PersonController } from './person.controller.js';

@Module({
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
