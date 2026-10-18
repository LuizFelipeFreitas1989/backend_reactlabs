import { Test, TestingModule } from '@nestjs/testing';
import { ConferenciaController } from './conferencia.controller.js';
import { ConferenciaService } from './conferencia.service.js';

describe('ConferenciaController', () => {
  let controller: ConferenciaController;
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
      controllers: [ConferenciaController],
      providers: [
        {
          provide: ConferenciaService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<ConferenciaController>(ConferenciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create with dto', async () => {
    const dto = {
      acronimo: 'ICSE',
      nome: 'International Conference on Software Engineering',
      qualificacao: 'A1',
      subtitulo: 'Sub ICSE',
      localizacao: 'Lisboa',
      data: '2026-05-20T00:00:00.000Z',
      deadline: '2026-01-15T00:00:00.000Z',
      link: 'https://icse2026.org',
    };
    const expected = { id: '64b1f0000000000000000003', ...dto };
    service.create.mockResolvedValue(expected);

    const result = await controller.create(dto);
    expect(result).toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should call service.findAll', async () => {
    const list = [{ id: '64b1f0000000000000000003' }];
    service.findAll.mockResolvedValue(list);

    const result = await controller.findAll();
    expect(result).toEqual(list);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call service.findOne with string id', async () => {
    const conf = { id: '64b1f0000000000000000003' };
    service.findOne.mockResolvedValue(conf);

    const result = await controller.findOne('64b1f0000000000000000003');
    expect(result).toEqual(conf);
    expect(service.findOne).toHaveBeenCalledWith('64b1f0000000000000000003');
  });

  it('should call service.update with string id and dto', async () => {
    const updateDto = { acronimo: 'ICSE 2026' };
    const updated = { id: '64b1f0000000000000000003', ...updateDto };
    service.update.mockResolvedValue(updated);

    const result = await controller.update('64b1f0000000000000000003', updateDto);
    expect(result).toEqual(updated);
    expect(service.update).toHaveBeenCalledWith('64b1f0000000000000000003', updateDto);
  });

  it('should call service.remove with string id', async () => {
    const removed = { id: '64b1f0000000000000000003' };
    service.remove.mockResolvedValue(removed);

    const result = await controller.remove('64b1f0000000000000000003');
    expect(result).toEqual(removed);
    expect(service.remove).toHaveBeenCalledWith('64b1f0000000000000000003');
  });
});

