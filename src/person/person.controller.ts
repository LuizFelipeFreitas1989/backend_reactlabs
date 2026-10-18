import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
import 'multer';
import { PersonService } from './person.service.js';
import { CreatePersonDto } from './dto/create-person.dto.js';
import { UpdatePersonDto } from './dto/update-person.dto.js';
import { CurriculumService } from '../curriculum/curriculum.service.js';
import { parseStringPromise } from "xml2js"

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService,
    private readonly curriculumService: CurriculumService
  ) { }

  @Post()
  @ApiOperation({
    summary:
      'Criar uma nova pessoa (aceita multipart/form-data com upload de arquivo ou application/json)',
  })
  @ApiConsumes('multipart/form-data', 'application/json')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    createPersonDto.tags = createPersonDto?.tags ? (createPersonDto.tags as unknown as string).split(',').map((tag) => tag.trim()) : [];
    createPersonDto.publicationIDs = createPersonDto?.publicationIDs ? (createPersonDto.publicationIDs as unknown as string).split(',').map((id) => id.trim()) : [];

    if (file) {
      try {
        const xmlData = file?.buffer.toString('utf8') ?? "";
        const result = await parseStringPromise(xmlData);
        const curriculum = await this.curriculumService.create(
          { CURRICULUM_VITAE: result }
        );

        createPersonDto.lattesCv = curriculum.id;

      } catch (error) {
        console.log('Error parsing XML:', error);
      }
    }

    return this.personService.create(createPersonDto);
  }

  @Get()
  findAll(@Query('search') search?: string) {
    return this.personService.findAll(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(id);
  }
}
