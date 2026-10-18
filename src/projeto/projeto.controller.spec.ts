import { Test, TestingModule } from '@nestjs/testing';
import { ProjetoController } from './projeto.controller.js';
import { ProjetoService } from './projeto.service.js';

describe('ProjetoController', () => {
  let controller: ProjetoController;
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
      controllers: [ProjetoController],
      providers: [
        {
          provide: ProjetoService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<ProjetoController>(ProjetoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create with dto', async () => {
    const dto = {
      nome: 'Projeto Alpha',
      subtitulo: 'Sub Alpha',
      descricao: 'Desc Alpha',
      status: 'ATIVO',
    };
    const expected = { id: '64b1f0000000000000000001', ...dto };
    service.create.mockResolvedValue(expected);

    const result = await controller.create(dto);
    expect(result).toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should call service.findAll', async () => {
    const list = [{ id: '64b1f0000000000000000001' }];
    service.findAll.mockResolvedValue(list);

    const result = await controller.findAll();
    expect(result).toEqual(list);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call service.findOne with string id', async () => {
    const project = { id: '64b1f0000000000000000001' };
    service.findOne.mockResolvedValue(project);

    const result = await controller.findOne('64b1f0000000000000000001');
    expect(result).toEqual(project);
    expect(service.findOne).toHaveBeenCalledWith('64b1f0000000000000000001');
  });

  it('should call service.update with string id and dto', async () => {
    const updateDto = { nome: 'New Name' };
    const updated = { id: '64b1f0000000000000000001', ...updateDto };
    service.update.mockResolvedValue(updated);

    const result = await controller.update('64b1f0000000000000000001', updateDto);
    expect(result).toEqual(updated);
    expect(service.update).toHaveBeenCalledWith('64b1f0000000000000000001', updateDto);
  });

  it('should call service.remove with string id', async () => {
    const removed = { id: '64b1f0000000000000000001' };
    service.remove.mockResolvedValue(removed);

    const result = await controller.remove('64b1f0000000000000000001');
    expect(result).toEqual(removed);
    expect(service.remove).toHaveBeenCalledWith('64b1f0000000000000000001');
  });
});

