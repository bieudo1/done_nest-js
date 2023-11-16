import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { NoteService } from './note.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [
  TypeOrmModule.forFeature([Note]),
  CacheModule.register({
    store: redisStore,
    host: 'localhost',
    port: 6379,
  }),
  ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
