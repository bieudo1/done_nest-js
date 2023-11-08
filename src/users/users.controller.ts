import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //get all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  //create new users
  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  //edit users by id
  @Put(':id')
  async update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.usersService.update(id, user);
  }

  //Delete users by id
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.usersService.delete(id);
  }
}
