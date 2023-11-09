import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Note)
    private  noteRepository: Repository<Note>,
  ) {}

  // Retrieves all Notes from the database using the noteRepository.
  async findAll(): Promise<Note[]> {
    return await  this.noteRepository.find();
  }

  // Saves a new Note to the database using the noteRepository.
  async create(note: Note): Promise<Note> {
    return await  this.noteRepository.save(note);
  }

  // Updates an existing Note in the database using the noteRepository.
  async update(id: number, note: Note): Promise<Note> {
    await this.noteRepository.update(id, note);
    return this.noteRepository.findOne({ where: { id: id } });;
  }

  // Deletes a Note from the database using the noteRepository.
  async delete(id: number): Promise<void> {
    await this.noteRepository.delete(id);
  }
}
