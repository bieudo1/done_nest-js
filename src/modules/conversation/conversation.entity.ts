import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import {User} from '../user/user.entity';
import { Message } from '../message/message.entity';
 
@Entity()
export class Conversation { 
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Message, (message) => message.conversation)
  messages?: Message[];
  
  @CreateDateColumn()
  createdAt: Date;
  
  @Column("int", { array: true })
  user_id: number[];

  @UpdateDateColumn()
  updatedAt: Date;

  // @ManyToMany(() => User, (users) => users.conversations)
  // @JoinTable({
  //   name: 'user_conversation',
  //   joinColumn: { name: 'conversation_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'user_id' },
  // })
  // users: User[];

  @ManyToOne(() => User)
  public users: User[];
}