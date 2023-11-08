/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Retrieves all users from the database using the userRepository.
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Saves a new user to the database using the userRepository.
  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  // Updates an existing user in the database using the userRepository.
  async update(id: any, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne(id);
  }

  // Deletes a user from the database using the userRepository.
  async delete(id: any): Promise<void> {
    await this.userRepository.delete(id);
  }
}
