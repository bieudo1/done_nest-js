import { Entity, PrimaryGeneratedColumn, Column,ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
  password: string;

  @Column({ default: ROLES.USERS })
  roles: ROLES;
}
