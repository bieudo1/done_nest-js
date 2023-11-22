import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import {User} from '../user/user.entity';
import { Conversation } from '../conversation/conversation.entity';
 
@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  conversation_id: number;

  @Column()
  user_id: number;

  @Column()
  public message: string;
 
  @ManyToOne(() => User)
  public author: User;

  @Column({ default: false })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn({ name: 'conversation_id' })
  conversation?: Conversation;
}
