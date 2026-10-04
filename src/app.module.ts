import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProjetoModule } from './projeto/projeto.module.js';
import { ConferenciaModule } from './conferencia/conferencia.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [PrismaModule, ProjetoModule, ConferenciaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

