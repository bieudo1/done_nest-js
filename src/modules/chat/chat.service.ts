import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import { AuthService } from '../auth/auth.service';
import { User } from '../user/user.entity';
import {Message} from '../message/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {
  }
  async getUserFromSocket(socket: Socket) {
    const cookie = socket.handshake.headers.cookie;
    const { Authentication: authenticationToken } = parse(cookie);
    const user = await this.authService.getUserFromAuthenticationToken(authenticationToken);
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }

  async saveMessage(content: string, author: User) {
    const newMessage = await this.messagesRepository.create({
      content,
      author
    });
    await this.messagesRepository.save(newMessage);
    return newMessage;
  }
 
  async getAllMessages() {
    return this.messagesRepository.find({
      relations: ['author']
    });
  }
}