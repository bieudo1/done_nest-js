import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { Note } from './note.entity';

@Controller('note')
export class NoteController {
  constructor(private readonly NoteService: NoteService) {}

  //get all note
  @Get()
  async findAll(): Promise<Note[]> {
    return this.NoteService.findAll();
  }

  //create new note
  @Post()
  async create(@Body() note: Note): Promise<Note> {
    return this.NoteService.create(note);
  }

  //edit note by id
  @Put(':id')
  async update(@Param('id') id: number, @Body() note: Note): Promise<Note> {
    return this.NoteService.update(id, note);
  }

  //Delete note by id
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.NoteService.delete(id);
  }
}
