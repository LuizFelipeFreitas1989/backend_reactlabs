import { Test, TestingModule } from '@nestjs/testing';
import { CurriculumService } from './curriculum.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('CurriculumService', () => {
  let service: CurriculumService;
  let prisma: {
    curriculum: {
      create: ReturnType<typeof vi.fn>;
      findMany: ReturnType<typeof vi.fn>;
      findUnique: ReturnType<typeof vi.fn>;
      update: ReturnType<typeof vi.fn>;
      delete: ReturnType<typeof vi.fn>;
    };
  };

  beforeEach(async () => {
    prisma = {
      curriculum: {
        create: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurriculumService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<CurriculumService>(CurriculumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a curriculum entry', async () => {
      const dto = { CURRICULUM_VITAE: 'cv-data' };
      const expected = { id: '64b1f0000000000000000001', ...dto };
      prisma.curriculum.create.mockResolvedValue(expected);

      const result = await service.create(dto);
      expect(result).toEqual(expected);
      expect(prisma.curriculum.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('findAll', () => {
    it('should return all curriculum entries', async () => {
      const entries = [
        { id: '64b1f0000000000000000001', CURRICULUM_VITAE: 'cv-data' },
      ];
      prisma.curriculum.findMany.mockResolvedValue(entries);

      const result = await service.findAll();
      expect(result).toEqual(entries);
      expect(prisma.curriculum.findMany).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it('should return a curriculum entry by id', async () => {
      const entry = { id: '64b1f0000000000000000001', CURRICULUM_VITAE: 'cv-data' };
      prisma.curriculum.findUnique.mockResolvedValue(entry);

      const result = await service.findOne('64b1f0000000000000000001');
      expect(result).toEqual(entry);
      expect(prisma.curriculum.findUnique).toHaveBeenCalledWith({
        where: { id: '64b1f0000000000000000001' },
      });
    });

    it('should return null when curriculum entry is not found', async () => {
      prisma.curriculum.findUnique.mockResolvedValue(null);

      const result = await service.findOne('nonexistent-id');
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update and return the curriculum entry', async () => {
      const dto = { CURRICULUM_VITAE: 'updated-cv' };
      const updated = { id: '64b1f0000000000000000001', ...dto };
      prisma.curriculum.update.mockResolvedValue(updated);

      const result = await service.update('64b1f0000000000000000001', dto);
      expect(result).toEqual(updated);
      expect(prisma.curriculum.update).toHaveBeenCalledWith({
        where: { id: '64b1f0000000000000000001' },
        data: dto,
      });
    });
  });

  describe('remove', () => {
    it('should delete and return the curriculum entry', async () => {
      const entry = { id: '64b1f0000000000000000001', CURRICULUM_VITAE: 'cv-data' };
      prisma.curriculum.delete.mockResolvedValue(entry);

      const result = await service.remove('64b1f0000000000000000001');
      expect(result).toEqual(entry);
      expect(prisma.curriculum.delete).toHaveBeenCalledWith({
        where: { id: '64b1f0000000000000000001' },
      });
    });
  });
});
