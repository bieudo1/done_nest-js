import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { Chat } from './chat.entity';
import { ConversationService } from '../conversation/conversation.service';
import { MessageService } from '../message/message.service';
 
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
 
  constructor(
    private readonly chatService: ChatService,
    private readonly conversationService: ConversationService,
    private readonly messageService: MessageService,

  ) {
  }

  async handleDisconnect(client: Socket) {
    const user = await this.chatService.getUserFromSocket(client);
    await this.chatService.deleteByValue(user.id,client.id);
  }


  afterInit(server: Server) {
    console.log(server);
    //Do stuffs
  }
 
  async handleConnection(client: Socket) {
    const user = await this.chatService.getUserFromSocket(client);

    const information  = {
      user_id: user.id,
      status: false,
      type: "socket_id",
      value: client.id,
    };
    
    await this.chatService.createChat(information);
  }
 
  @SubscribeMessage('messages')
  async messages(
    client: Socket,
   @MessageBody() payload: any) { 

    const conversation = await this.conversationService.findById(
      payload.conversation_id,
      ['users'],
    );

    const userId = [...conversation.user_id];
    // conversation.user_id.map((user:any) => {
    //   userId.push(user.id);

    //   return user;
    // });

    const dataSocketId = await this.chatService.findSocketId(userId);
    const message = await this.messageService.create({
      user_id: payload.user_id,
      status: false,
      message: payload.message,
      conversation_id: payload.conversation_id,
    });
    this.server.sockets.emit('receive_message', message);
    const emit = this.server;
    dataSocketId.map((value) => {
       emit.to(value.value).emit('message-received', {
        id: message.id,
        message: message.message,
        conversation_id: message.conversation_id,
        user_id: message.user_id,
        status: message.status,
        createdAt: message.createdAt,
        updatedAt: message.updatedAt,
      });
    });
 
    return message;
  }


}