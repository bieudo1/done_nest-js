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
  constructor(private readonly noteService: NoteService) {}

  //get all note
  @Get()
  async findAll(): Promise<Note[]> {
    return this.noteService.findAll();
  }

  //create new note
  @Post()
  async create(@Body() note: Note): Promise<Note> {
    return this.noteService.create(note);
  }

  //edit note by id
  @Put(':id')
  async update(@Param('id') id: number, @Body() note: Note): Promise<Note> {
    return this.noteService.update(id, note);
  }

  //Delete note by id
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.noteService.delete(id);
  }
}
