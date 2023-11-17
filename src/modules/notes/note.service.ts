import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private  noteRepository: Repository<Note>,
  ) {}

  // Retrieves all Notes from the database using the noteRepository.
  async findAll(): Promise<Note[]> {
    return await  this.noteRepository.find();
  }
  async findOne(id: number): Promise<Note> {
    return this.noteRepository.findOne({ where: { id: id } });;
  }
  // Saves a new Note to the database using the noteRepository.
  async create(note: Note): Promise<Note> {
    return await  this.noteRepository.save(note);
  }

  // Updates an existing Note in the database using the noteRepository.
  async update(id: number, requestBody: any): Promise<Note> {
    let note = await this.noteRepository.findOne({ where: { id: id } });
    if (!note) {
      throw new NotFoundException('Note do not exist')
    }
    note = {...note, ...requestBody}
    return await this.noteRepository.save(note);
  }

  // Deletes a Note from the database using the noteRepository.
  async delete(id: number): Promise<void> {
    await this.noteRepository.delete(id);
  }
}
