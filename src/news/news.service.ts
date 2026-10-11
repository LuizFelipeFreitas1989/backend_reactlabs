import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateNewsDto } from './dto/create-news.dto.js';
import { UpdateNewsDto } from './dto/update-news.dto.js';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createNewsDto: CreateNewsDto) {
    return this.prisma.news.create({
      data: {
        title: createNewsDto.title,
        content: createNewsDto.content,
        link: createNewsDto.link,
      },
    });
  }

  findAll() {
    return this.prisma.news.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const news = await this.prisma.news.findUnique({ where: { id } });

    if (!news) {
      throw new NotFoundException(`Notícia com ID '${id}' não encontrada`);
    }

    return news;
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    await this.findOne(id);

    return this.prisma.news.update({
      where: { id },
      data: {
        ...(updateNewsDto.title !== undefined && {
          title: updateNewsDto.title,
        }),
        ...(updateNewsDto.content !== undefined && {
          content: updateNewsDto.content,
        }),
        ...(updateNewsDto.link !== undefined && { link: updateNewsDto.link }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.news.delete({ where: { id } });
  }
}
