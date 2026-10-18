import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateConferenciaDto } from './dto/create-conferencia.dto.js';
import { UpdateConferenciaDto } from './dto/update-conferencia.dto.js';

@Injectable()
export class ConferenciaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createConferenciaDto: CreateConferenciaDto) {
    return this.prisma.conferencia.create({
      data: {
        acronimo: createConferenciaDto.acronimo,
        nome: createConferenciaDto.nome,
        qualificacao: createConferenciaDto.qualificacao,
        subtitulo: createConferenciaDto.subtitulo,
        localizacao: createConferenciaDto.localizacao,
        data: new Date(createConferenciaDto.data),
        deadline: new Date(createConferenciaDto.deadline),
        link: createConferenciaDto.link,
      },
    });
  }

  async findAll() {
    return this.prisma.conferencia.findMany();
  }

  async findOne(id: string) {
    const conferencia = await this.prisma.conferencia.findUnique({
      where: { id },
    });

    if (!conferencia) {
      throw new NotFoundException(`Conferência com ID '${id}' não encontrada`);
    }

    return conferencia;
  }

  async update(id: string, updateConferenciaDto: UpdateConferenciaDto) {
    await this.findOne(id);

    return this.prisma.conferencia.update({
      where: { id },
      data: {
        ...(updateConferenciaDto.acronimo !== undefined && {
          acronimo: updateConferenciaDto.acronimo,
        }),
        ...(updateConferenciaDto.nome !== undefined && {
          nome: updateConferenciaDto.nome,
        }),
        ...(updateConferenciaDto.qualificacao !== undefined && {
          qualificacao: updateConferenciaDto.qualificacao,
        }),
        ...(updateConferenciaDto.subtitulo !== undefined && {
          subtitulo: updateConferenciaDto.subtitulo,
        }),
        ...(updateConferenciaDto.localizacao !== undefined && {
          localizacao: updateConferenciaDto.localizacao,
        }),
        ...(updateConferenciaDto.data !== undefined && {
          data: new Date(updateConferenciaDto.data),
        }),
        ...(updateConferenciaDto.deadline !== undefined && {
          deadline: new Date(updateConferenciaDto.deadline),
        }),
        ...(updateConferenciaDto.link !== undefined && {
          link: updateConferenciaDto.link,
        }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.conferencia.delete({
      where: { id },
    });
  }
}

