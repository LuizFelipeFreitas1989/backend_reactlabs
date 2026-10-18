import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConferenciaService } from './conferencia.service.js';
import { CreateConferenciaDto } from './dto/create-conferencia.dto.js';
import { UpdateConferenciaDto } from './dto/update-conferencia.dto.js';

@Controller('conferencia')
export class ConferenciaController {
  constructor(private readonly conferenciaService: ConferenciaService) {}

  @Post()
  create(@Body() createConferenciaDto: CreateConferenciaDto) {
    return this.conferenciaService.create(createConferenciaDto);
  }

  @Get()
  findAll() {
    return this.conferenciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conferenciaService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConferenciaDto: UpdateConferenciaDto,
  ) {
    return this.conferenciaService.update(id, updateConferenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conferenciaService.remove(id);
  }
}

