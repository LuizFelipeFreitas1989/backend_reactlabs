import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePersonDto } from './dto/create-person.dto.js';
import { UpdatePersonDto } from './dto/update-person.dto.js';

@Injectable()
export class PersonService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPersonDto: CreatePersonDto) {
    return this.prisma.person.create({
      data: {
        name: createPersonDto.name,
        occupation: createPersonDto.occupation,
        institution: createPersonDto.institution,
        tags: createPersonDto.tags ?? [],
        lattesCv: createPersonDto.lattesCv,
        orcid: createPersonDto.orcid,
        googleScholar: createPersonDto.googleScholar,
        linkedIn: createPersonDto.linkedIn,
        website: createPersonDto.website,
        about: createPersonDto.about,
        publicationIDs: createPersonDto.publicationIDs ?? [],
      },
    });
  }

  findAll(search?: string) {
    const searchTerm = search?.trim();

    return this.prisma.person.findMany({
      where: searchTerm
        ? {
            OR: [
              { name: { contains: searchTerm, mode: 'insensitive' } },
              { occupation: { contains: searchTerm, mode: 'insensitive' } },
              { institution: { contains: searchTerm, mode: 'insensitive' } },
            ],
          }
        : undefined,
      include: {
        publications: true,
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const person = await this.prisma.person.findUnique({
      where: { id },
      include: {
        publications: true,
      },
    });

    if (!person) {
      throw new NotFoundException(`Pessoa com ID '${id}' não encontrada`);
    }

    return person;
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    await this.findOne(id);

    return this.prisma.person.update({
      where: { id },
      data: {
        ...(updatePersonDto.name !== undefined && {
          name: updatePersonDto.name,
        }),
        ...(updatePersonDto.occupation !== undefined && {
          occupation: updatePersonDto.occupation,
        }),
        ...(updatePersonDto.institution !== undefined && {
          institution: updatePersonDto.institution,
        }),
        ...(updatePersonDto.tags !== undefined && {
          tags: updatePersonDto.tags,
        }),
        ...(updatePersonDto.lattesCv !== undefined && {
          lattesCv: updatePersonDto.lattesCv,
        }),
        ...(updatePersonDto.orcid !== undefined && {
          orcid: updatePersonDto.orcid,
        }),
        ...(updatePersonDto.googleScholar !== undefined && {
          googleScholar: updatePersonDto.googleScholar,
        }),
        ...(updatePersonDto.linkedIn !== undefined && {
          linkedIn: updatePersonDto.linkedIn,
        }),
        ...(updatePersonDto.website !== undefined && {
          website: updatePersonDto.website,
        }),
        ...(updatePersonDto.about !== undefined && {
          about: updatePersonDto.about,
        }),
        ...(updatePersonDto.publicationIDs !== undefined && {
          publicationIDs: updatePersonDto.publicationIDs,
        }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.person.delete({ where: { id } });
  }
}
