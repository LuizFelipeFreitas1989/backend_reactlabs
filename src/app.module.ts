import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProjetoModule } from './projeto/projeto.module.js';
import { ConferenciaModule } from './conferencia/conferencia.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { NewsModule } from './news/news.module.js';
import { ResearchAreaModule } from './research_area/research_area.module.js';
import { PersonModule } from './person/person.module.js';
import { PartnersModule } from './partners/partners.module.js';
import { JournalModule } from './journal/journal.module.js';

@Module({
  imports: [
    PrismaModule,
    ProjetoModule,
    ConferenciaModule,
    NewsModule,
    ResearchAreaModule,
    PersonModule,
    PartnersModule,
    JournalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

