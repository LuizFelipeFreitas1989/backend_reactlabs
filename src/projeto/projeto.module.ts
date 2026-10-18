import { Module } from '@nestjs/common';
import { ProjetoService } from './projeto.service.js';
import { ProjetoController } from './projeto.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [ProjetoController],
  providers: [ProjetoService],
  exports: [ProjetoService],
})
export class ProjetoModule {}

