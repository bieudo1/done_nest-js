
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './conversation.entity';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

//Conversation
@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    TypeOrmModule.forFeature([User]),

  ],
  controllers: [ConversationController],
  providers: [
    ConversationService,
    UserService
  ],
})
export class ConversationModule {}
