import { Module } from '@nestjs/common';
import { ConferenciaService } from './conferencia.service.js';
import { ConferenciaController } from './conferencia.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [ConferenciaController],
  providers: [ConferenciaService],
  exports: [ConferenciaService],
})
export class ConferenciaModule {}

