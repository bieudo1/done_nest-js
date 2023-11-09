import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Note } from './note.entity';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //get all note
  @Get()
  async findAll(): Promise<Note[]> {
    return this.appService.findAll();
  }

  //create new note
  @Post()
  async create(@Body() note: Note): Promise<Note> {
    return this.appService.create(note);
  }

  //edit note by id
  @Put(':id')
  async update(@Param('id') id: number, @Body() note: Note): Promise<Note> {
    return this.appService.update(id, note);
  }

  //Delete note by id
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.appService.delete(id);
  }
}
