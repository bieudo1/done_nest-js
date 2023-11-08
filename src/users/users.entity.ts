/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: any;

  @Column()
  username: string;

  @Column()
  email: string;
}
