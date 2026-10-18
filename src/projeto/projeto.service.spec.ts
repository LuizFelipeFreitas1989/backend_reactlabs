import { Test, TestingModule } from '@nestjs/testing';
import { ProjetoService } from './projeto.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('ProjetoService', () => {
  let service: ProjetoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjetoService, PrismaService],
    }).compile();

    service = module.get<ProjetoService>(ProjetoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
