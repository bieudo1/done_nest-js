import { Entity, PrimaryGeneratedColumn, Column,ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

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
}
