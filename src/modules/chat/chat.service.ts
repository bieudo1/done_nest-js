import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import { AuthService } from '../auth/auth.service';
import { User } from '../user/user.entity';
import {Message} from '../message/message.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {
  }
  async getUserFromSocket(socket: Socket) {
    const cookie = socket.handshake.headers.cookie;
    const user = await this.authService.getUserFromAuthenticationToken(cookie);
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }

  async saveMessage(content: string, author: User) {
   const newMessage =  await this.messagesRepository.save({
      content,
      author
    });
    return newMessage;
  }
 
  async getAllMessages() {
    return this.messagesRepository.find({
      relations: ['author']
    });
  }

  async createChat(chat: any): Promise<Chat> {
    return await this.chatRepository.save(chat);
  }

  async deleteByValue(user_id: any, value: any) {
    return await this.chatRepository.delete({user_id,value});
  }

  async getMessages(): Promise<Chat[]> {
    return await this.chatRepository.find();
  }

  async findSocketId(user_id: number[]) { 
    const TYPE='socket_id'
    return await this.chatRepository.find({
      where: { user_id: In(user_id) },
      select: ['value'],
    });
  }
}