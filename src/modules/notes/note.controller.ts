import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Inject,
} from '@nestjs/common';
import { CACHE_MANAGER,CacheInterceptor,CacheTTL } from '@nestjs/cache-manager';
import { NoteService } from './note.service';
import { Cache } from 'cache-manager';
import { Note } from './note.entity';

@Controller('note')
export class NoteController {
  constructor(
    private readonly noteService: NoteService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

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
    await this.cacheManager.del(`demoCachekey`);
    return this.noteService.update(id, note);
  }

  //Delete note by id
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.cacheManager.del(`demoCachekey`);
    return this.noteService.delete(id);
  }
  @Get('cache/demo/set-cache')
  async democahe(): Promise<Note[]> {
    const key = `demoCachekey`;
    const cachedData = await this.cacheManager.get(key);
    if (cachedData) {
      return cachedData;
    }
    const data = await this.noteService.findAll();
    await this.cacheManager.set(key, data, { ttl: 60*10 });
    return data;
  }
}
