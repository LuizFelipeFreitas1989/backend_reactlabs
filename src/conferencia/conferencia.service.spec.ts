import { Test, TestingModule } from '@nestjs/testing';
import { ConferenciaService } from './conferencia.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('ConferenciaService', () => {
  let service: ConferenciaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConferenciaService, PrismaService],
    }).compile();

    service = module.get<ConferenciaService>(ConferenciaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
