import { Test, TestingModule } from '@nestjs/testing';
import { PersonController } from './person.controller.js';
import { PersonService } from './person.service.js';

describe('PersonController', () => {
  let controller: PersonController;
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
      controllers: [PersonController],
      providers: [
        {
          provide: PersonService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<PersonController>(PersonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create with dto', async () => {
    const dto = {
      name: 'Maria Silva',
      occupation: 'Professora',
      institution: 'UFMG',
      lattesCv: 'http://lattes.cnpq.br/123',
      orcid: '0000-0002-1825-0097',
      googleScholar: 'https://scholar.google.com/citations?user=123',
      linkedIn: 'https://linkedin.com/in/mariasilva',
      website: 'https://mariasilva.com',
      about: 'Pesquisadora.',
    };
    const expected = { id: '64b1f0000000000000000001', ...dto };
    service.create.mockResolvedValue(expected);

    const result = await controller.create(dto);
    expect(result).toEqual(expected);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should call service.findAll with optional search', async () => {
    const list = [{ id: '64b1f0000000000000000001' }];
    service.findAll.mockResolvedValue(list);

    const result = await controller.findAll('Maria');
    expect(result).toEqual(list);
    expect(service.findAll).toHaveBeenCalledWith('Maria');
  });

  it('should call service.findOne with string id', async () => {
    const person = { id: '64b1f0000000000000000001' };
    service.findOne.mockResolvedValue(person);

    const result = await controller.findOne('64b1f0000000000000000001');
    expect(result).toEqual(person);
    expect(service.findOne).toHaveBeenCalledWith('64b1f0000000000000000001');
  });

  it('should call service.update with string id and dto', async () => {
    const updateDto = { name: 'Maria Souza' };
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
