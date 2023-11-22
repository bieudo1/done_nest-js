import { Injectable } from "@nestjs/common";
import { Conversation } from "./conversation.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ConversationService {
  constructor(
    // @InjectRepository(Message)
    // private messagesRepository: Repository<Message>,
    @InjectRepository(Conversation) private conversationRepository: Repository<Conversation>,
  
  ) {
  }

  async create(inputs:any,currentUser:any) {
    return await this.conversationRepository.save({...inputs,user_id:[currentUser.id]})
  }

  async addUserstoConversation(id:number,adduser_id: any) {
    let conversation = await this.conversationRepository.findOne({
      where: { id },
    })
    console.log(adduser_id)
    conversation.user_id = [...conversation.user_id, ...adduser_id.user_id] 
    console.log(conversation)
    return await this.conversationRepository.save(conversation)
  }

  async findById(
    id: number,
    relations: string[] = [],
  ) {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
    })
    return conversation
  }
  

}