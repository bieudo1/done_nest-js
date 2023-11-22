import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

enum TYPE {
  socket_id = 'socket_id',
  device_id= 'device_id',
}

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  user_id: string;

  @Column()
  status: boolean;

  @Column()
  type: TYPE;

  @Column()
  value: string;

}
