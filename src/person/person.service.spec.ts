import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PersonService } from './person.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

describe('PersonService', () => {
  let service: PersonService;
  let prisma: {
    person: {
      create: ReturnType<typeof vi.fn>;
      findMany: ReturnType<typeof vi.fn>;
      findUnique: ReturnType<typeof vi.fn>;
      update: ReturnType<typeof vi.fn>;
      delete: ReturnType<typeof vi.fn>;
    };
  };

  beforeEach(async () => {
    prisma = {
      person: {
        create: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<PersonService>(PersonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new person', async () => {
      const dto = {
        name: 'Maria Silva',
        occupation: 'Professora',
        institution: 'UFMG',
        tags: ['IA', 'NLP'],
        lattesCv: 'http://lattes.cnpq.br/123',
        orcid: '0000-0002-1825-0097',
        googleScholar: 'https://scholar.google.com/citations?user=123',
        linkedIn: 'https://linkedin.com/in/mariasilva',
        website: 'https://mariasilva.com',
        about: 'Pesquisadora na área de processamento de linguagem natural.',
        publicationIDs: ['64b1f0000000000000000010'],
      };
      const expected = { id: '64b1f0000000000000000001', ...dto };
      prisma.person.create.mockResolvedValue(expected);

      const result = await service.create(dto);
      expect(result).toEqual(expected);
      expect(prisma.person.create).toHaveBeenCalledWith({
        data: {
          name: dto.name,
          occupation: dto.occupation,
          institution: dto.institution,
          tags: dto.tags,
          lattesCv: dto.lattesCv,
          orcid: dto.orcid,
          googleScholar: dto.googleScholar,
          linkedIn: dto.linkedIn,
          website: dto.website,
          about: dto.about,
          publicationIDs: dto.publicationIDs,
        },
      });
    });

    it('should default tags and publicationIDs to empty arrays if omitted', async () => {
      const dto = {
        name: 'Carlos Souza',
        occupation: 'Aluno de Mestrado',
        institution: 'USP',
        lattesCv: 'http://lattes.cnpq.br/456',
        orcid: '0000-0002-1825-0098',
        googleScholar: 'https://scholar.google.com/citations?user=456',
        linkedIn: 'https://linkedin.com/in/carlossouza',
        website: 'https://carlossouza.dev',
        about: 'Estudante de pós-graduação.',
      };
      const expected = {
        id: '64b1f0000000000000000002',
        ...dto,
        tags: [],
        publicationIDs: [],
      };
      prisma.person.create.mockResolvedValue(expected);

      const result = await service.create(dto);
      expect(result).toEqual(expected);
      expect(prisma.person.create).toHaveBeenCalledWith({
        data: {
          name: dto.name,
          occupation: dto.occupation,
          institution: dto.institution,
          tags: [],
          lattesCv: dto.lattesCv,
          orcid: dto.orcid,
          googleScholar: dto.googleScholar,
          linkedIn: dto.linkedIn,
          website: dto.website,
          about: dto.about,
          publicationIDs: [],
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return all persons', async () => {
      const persons = [{ id: '64b1f0000000000000000001', name: 'Maria Silva' }];
      prisma.person.findMany.mockResolvedValue(persons);

      const result = await service.findAll();
      expect(result).toEqual(persons);
      expect(prisma.person.findMany).toHaveBeenCalledWith({
        where: undefined,
        include: { publications: true },
        orderBy: { name: 'asc' },
      });
    });

    it('should filter by search term', async () => {
      const persons = [{ id: '64b1f0000000000000000001', name: 'Maria Silva' }];
      prisma.person.findMany.mockResolvedValue(persons);

      const result = await service.findAll('Maria');
      expect(result).toEqual(persons);
      expect(prisma.person.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { name: { contains: 'Maria', mode: 'insensitive' } },
            { occupation: { contains: 'Maria', mode: 'insensitive' } },
            { institution: { contains: 'Maria', mode: 'insensitive' } },
          ],
        },
        include: { publications: true },
        orderBy: { name: 'asc' },
      });
    });
  });

  describe('findOne', () => {
    it('should return a person if found', async () => {
      const person = { id: '64b1f0000000000000000001', name: 'Maria Silva' };
      prisma.person.findUnique.mockResolvedValue(person);

      const result = await service.findOne('64b1f0000000000000000001');
      expect(result).toEqual(person);
      expect(prisma.person.findUnique).toHaveBeenCalledWith({
        where: { id: '64b1f0000000000000000001' },
        include: { publications: true },
      });
    });

    it('should throw NotFoundException if person not found', async () => {
      prisma.person.findUnique.mockResolvedValue(null);

      await expect(service.findOne('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update person and return updated entity', async () => {
      const existing = { id: '64b1f0000000000000000001', name: 'Maria Silva' };
      const updated = {
        id: '64b1f0000000000000000001',
        name: 'Maria S. Silva',
      };
      prisma.person.findUnique.mockResolvedValue(existing);
      prisma.person.update.mockResolvedValue(updated);

      const result = await service.update('64b1f0000000000000000001', {
        name: 'Maria S. Silva',
      });
      expect(result).toEqual(updated);
      expect(prisma.person.update).toHaveBeenCalledWith({
        where: { id: '64b1f0000000000000000001' },
        data: {
          name: 'Maria S. Silva',
        },
      });
    });
  });

  describe('remove', () => {
    it('should delete person and return deleted entity', async () => {
      const existing = { id: '64b1f0000000000000000001', name: 'Maria Silva' };
      prisma.person.findUnique.mockResolvedValue(existing);
      prisma.person.delete.mockResolvedValue(existing);

      const result = await service.remove('64b1f0000000000000000001');
      expect(result).toEqual(existing);
      expect(prisma.person.delete).toHaveBeenCalledWith({
        where: { id: '64b1f0000000000000000001' },
      });
    });
  });
});
