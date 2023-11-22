
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { ChatService } from './chat.service';
import {Message} from '../message/message.entity';
import { ChatGateway } from './chat.gateway';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { Chat } from './chat.entity';
import { ChatController } from './chat.controller';
import { MessageService } from '../message/message.service';
import { ConversationService } from '../conversation/conversation.service';
import { Conversation } from '../conversation/conversation.entity';

//Conversation
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Chat]),
    TypeOrmModule.forFeature([Message]),
    TypeOrmModule.forFeature([Conversation]),
  ],
  controllers: [ChatController],
  providers: [
    ChatService,
    AuthService,
    UserService,
    ChatGateway,
    MessageService,
    ConversationService],
})
export class ChatModule {}
