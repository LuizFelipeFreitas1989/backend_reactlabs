import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePartnerDto } from './dto/create-partner.dto.js';
import { UpdatePartnerDto } from './dto/update-partner.dto.js';

@Injectable()
export class PartnersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPartnerDto: CreatePartnerDto) {
    return this.prisma.partner.create({
      data: {
        name: createPartnerDto.name,
        type: createPartnerDto.type,
        country: createPartnerDto.country,
        description: createPartnerDto.description,
        websiteUrl: createPartnerDto.websiteUrl,
      },
    });
  }

  findAll() {
    return this.prisma.partner.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: string) {
    const partner = await this.prisma.partner.findUnique({ where: { id } });

    if (!partner) {
      throw new NotFoundException(`Parceiro com ID '${id}' não encontrado`);
    }

    return partner;
  }

  async update(id: string, updatePartnerDto: UpdatePartnerDto) {
    await this.findOne(id);

    return this.prisma.partner.update({
      where: { id },
      data: {
        ...(updatePartnerDto.name !== undefined && {
          name: updatePartnerDto.name,
        }),
        ...(updatePartnerDto.type !== undefined && {
          type: updatePartnerDto.type,
        }),
        ...(updatePartnerDto.country !== undefined && {
          country: updatePartnerDto.country,
        }),
        ...(updatePartnerDto.description !== undefined && {
          description: updatePartnerDto.description,
        }),
        ...(updatePartnerDto.websiteUrl !== undefined && {
          websiteUrl: updatePartnerDto.websiteUrl,
        }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.partner.delete({ where: { id } });
  }
}
