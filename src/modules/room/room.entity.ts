import { Entity, PrimaryGeneratedColumn, Column,ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Room{
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User)
  public host: User;

  @ManyToOne(() => User)
  public users: User[];
}
