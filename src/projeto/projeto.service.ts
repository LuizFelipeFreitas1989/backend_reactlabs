import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProjetoDto } from './dto/create-projeto.dto.js';
import { UpdateProjetoDto } from './dto/update-projeto.dto.js';

@Injectable()
export class ProjetoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjetoDto: CreateProjetoDto) {
    return this.prisma.projeto.create({
      data: {
        nome: createProjetoDto.nome,
        subtitulo: createProjetoDto.subtitulo,
        descricao: createProjetoDto.descricao,
        status: createProjetoDto.status,
        tags: createProjetoDto.tags ?? [],
        pesquisadores: createProjetoDto.pesquisadores ?? [],
      },
    });
  }

  async findAll() {
    return this.prisma.projeto.findMany();
  }

  async findOne(id: string) {
    const projeto = await this.prisma.projeto.findUnique({
      where: { id },
    });

    if (!projeto) {
      throw new NotFoundException(`Projeto com ID '${id}' não encontrado`);
    }

    return projeto;
  }

  async update(id: string, updateProjetoDto: UpdateProjetoDto) {
    await this.findOne(id);
    return this.prisma.projeto.update({
      where: { id },
      data: {
        ...(updateProjetoDto.nome !== undefined && { nome: updateProjetoDto.nome }),
        ...(updateProjetoDto.subtitulo !== undefined && {
          subtitulo: updateProjetoDto.subtitulo,
        }),
        ...(updateProjetoDto.descricao !== undefined && {
          descricao: updateProjetoDto.descricao,
        }),
        ...(updateProjetoDto.status !== undefined && {
          status: updateProjetoDto.status,
        }),
        ...(updateProjetoDto.tags !== undefined && { tags: updateProjetoDto.tags }),
        ...(updateProjetoDto.pesquisadores !== undefined && {
          pesquisadores: updateProjetoDto.pesquisadores,
        }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.projeto.delete({
      where: { id },
    });
  }
}

