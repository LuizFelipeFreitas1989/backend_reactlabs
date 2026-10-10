import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateJournalDto } from './dto/create-journal.dto.js';
import { UpdateJournalDto } from './dto/update-journal.dto.js';

@Injectable()
export class JournalService {
  constructor(private readonly prisma: PrismaService) {}

  create(createJournalDto: CreateJournalDto) {
    return this.prisma.journal.create({
      data: {
        acronym: createJournalDto.acronym,
        name: createJournalDto.name,
        publisher: createJournalDto.publisher,
        qualis: createJournalDto.qualis,
        topics: createJournalDto.topics,
        link: createJournalDto.link,
      },
    });
  }

  findAll(search?: string) {
    const searchTerm = search?.trim();

    return this.prisma.journal.findMany({
      where: searchTerm
        ? {
            OR: [
              { acronym: { contains: searchTerm, mode: 'insensitive' } },
              { name: { contains: searchTerm, mode: 'insensitive' } },
              { publisher: { contains: searchTerm, mode: 'insensitive' } },
              { qualis: { contains: searchTerm, mode: 'insensitive' } },
              { topics: { contains: searchTerm, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { acronym: 'asc' },
    });
  }

  async findOne(id: string) {
    const journal = await this.prisma.journal.findUnique({ where: { id } });

    if (!journal) {
      throw new NotFoundException(`Journal with ID '${id}' not found`);
    }

    return journal;
  }

  async update(id: string, updateJournalDto: UpdateJournalDto) {
    await this.findOne(id);

    return this.prisma.journal.update({
      where: { id },
      data: {
        ...(updateJournalDto.acronym !== undefined && {
          acronym: updateJournalDto.acronym,
        }),
        ...(updateJournalDto.name !== undefined && {
          name: updateJournalDto.name,
        }),
        ...(updateJournalDto.publisher !== undefined && {
          publisher: updateJournalDto.publisher,
        }),
        ...(updateJournalDto.qualis !== undefined && {
          qualis: updateJournalDto.qualis,
        }),
        ...(updateJournalDto.topics !== undefined && {
          topics: updateJournalDto.topics,
        }),
        ...(updateJournalDto.link !== undefined && {
          link: updateJournalDto.link,
        }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.journal.delete({ where: { id } });
  }
}
