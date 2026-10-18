import { Test, TestingModule } from '@nestjs/testing';
import { PartnersService } from './partners.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('PartnersService', () => {
  let service: PartnersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PartnersService,
        {
          provide: PrismaService,
          useValue: {
            partner: {
              create: vi.fn(),
              findMany: vi.fn(),
              findUnique: vi.fn(),
              update: vi.fn(),
              delete: vi.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PartnersService>(PartnersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
