import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { JournalService } from './journal.service.js';
import { CreateJournalDto } from './dto/create-journal.dto.js';
import { UpdateJournalDto } from './dto/update-journal.dto.js';

@Controller('journals')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  create(@Body() createJournalDto: CreateJournalDto) {
    return this.journalService.create(createJournalDto);
  }

  @Get()
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filters journals by acronym, name, publisher, Qualis, or topics',
  })
  findAll(@Query('search') search?: string) {
    return this.journalService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.journalService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJournalDto: UpdateJournalDto,
  ) {
    return this.journalService.update(id, updateJournalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.journalService.remove(id);
  }
}
