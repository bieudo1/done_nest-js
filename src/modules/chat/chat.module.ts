
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { ChatService } from './chat.service';
import {Message} from '../message/message.entity';
import { ChatGateway } from './chat.gateway';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';


@Module({
  imports: [
  TypeOrmModule.forFeature([Message]),
  TypeOrmModule.forFeature([User])
  ],
  controllers: [],
  providers: [ChatService,AuthService,UserService,ChatGateway],
})
export class ChatModule {}
