import { Test, TestingModule } from '@nestjs/testing';
import { CurriculumController } from './curriculum.controller.js';
import { CurriculumService } from './curriculum.service.js';

describe('CurriculumController', () => {
  let controller: CurriculumController;
  let service: {
    create: ReturnType<typeof vi.fn>;
    findAll: ReturnType<typeof vi.fn>;
    findOne: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    remove: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    service = {
      create: vi.fn(),
      findAll: vi.fn(),
      findOne: vi.fn(),
      update: vi.fn(),
      remove: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurriculumController],
      providers: [
        {
          provide: CurriculumService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<CurriculumController>(CurriculumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create with dto', async () => {
    const dto = { CURRICULUM_VITAE: 'cv-data' };
    const expected = { id: '64b1f0000000000000000001', ...dto };
    service.create.mockResolvedValue(expected);

    const result = await controller.create(dto);
    expect(result).toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should call service.findAll', async () => {
    const entries = [{ id: '64b1f0000000000000000001', CURRICULUM_VITAE: 'cv-data' }];
    service.findAll.mockResolvedValue(entries);

    const result = await controller.findAll();
    expect(result).toEqual(entries);
    expect(service.findAll).toHaveBeenCalledWith();
  });

  it('should call service.findOne with string id', async () => {
    const entry = { id: '64b1f0000000000000000001', CURRICULUM_VITAE: 'cv-data' };
    service.findOne.mockResolvedValue(entry);

    const result = await controller.findOne('64b1f0000000000000000001');
    expect(result).toEqual(entry);
    expect(service.findOne).toHaveBeenCalledWith('64b1f0000000000000000001');
  });

  it('should call service.update with string id and dto', async () => {
    const dto = { CURRICULUM_VITAE: 'updated-cv' };
    const updated = { id: '64b1f0000000000000000001', ...dto };
    service.update.mockResolvedValue(updated);

    const result = await controller.update('64b1f0000000000000000001', dto);
    expect(result).toEqual(updated);
    expect(service.update).toHaveBeenCalledWith('64b1f0000000000000000001', dto);
  });

  it('should call service.remove with string id', async () => {
    const entry = { id: '64b1f0000000000000000001', CURRICULUM_VITAE: 'cv-data' };
    service.remove.mockResolvedValue(entry);

    const result = await controller.remove('64b1f0000000000000000001');
    expect(result).toEqual(entry);
    expect(service.remove).toHaveBeenCalledWith('64b1f0000000000000000001');
  });
});
