/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(Note)
    private readonly NoteRepository: Repository<Note>,
  ) {}

  // Retrieves all Notes from the database using the NoteRepository.
  async findAll(): Promise<Note[]> {
    return this.NoteRepository.find();
  }

  // Saves a new Note to the database using the NoteRepository.
  async create(Note: Note): Promise<Note> {
    return this.NoteRepository.save(Note);
  }

  // Updates an existing Note in the database using the NoteRepository.
  async update(id: number, Note: Note): Promise<Note> {
    await this.NoteRepository.update(id, Note);
    return this.NoteRepository.findOne({ where: { id: id } });;
  }

  // Deletes a Note from the database using the NoteRepository.
  async delete(id: number): Promise<void> {
    await this.NoteRepository.delete(id);
  }
}
