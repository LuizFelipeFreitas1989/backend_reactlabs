import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service.js';
import { PartnersController } from './partners.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [PartnersController],
  providers: [PartnersService],
  exports: [PartnersService],
})
export class PartnersModule {}
