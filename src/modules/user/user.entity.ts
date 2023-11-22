import { Entity, PrimaryGeneratedColumn, Column,ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Conversation } from '../conversation/conversation.entity';

enum ROLES {
  ADMIN= 'ADMIN',
USERS= 'USERS'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  @Exclude()
  password: string;

  @Column({ default: ROLES.USERS })
  roles: ROLES;

  @ManyToMany(() => Conversation, (conversations) => conversations.users)
  @JoinTable({
    name: 'user_conversation',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'conversation_id' },
  })
  conversations: Conversation[];
}
