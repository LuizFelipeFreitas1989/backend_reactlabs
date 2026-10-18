import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service.js';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call $connect on module init', async () => {
    const connectSpy = vi.spyOn(service, '$connect').mockResolvedValue(undefined);
    await service.onModuleInit();
    expect(connectSpy).toHaveBeenCalled();
  });

  it('should call $disconnect on module destroy', async () => {
    const disconnectSpy = vi.spyOn(service, '$disconnect').mockResolvedValue(undefined);
    await service.onModuleDestroy();
    expect(disconnectSpy).toHaveBeenCalled();
  });
});

