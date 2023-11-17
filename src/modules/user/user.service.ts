import { Injectable, NotFoundException,HttpException, HttpStatus  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
const bcrypt = require("bcryptjs");
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }
  
  async findAll(): Promise<User[]> {
    return await  this.userRepository.find();
  }

  async create(urequestBody:any): Promise<User> {
    let {password,name , email } = urequestBody;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    let createUser = await this.userRepository.save({ password,name ,email });
    return (createUser)
  }

  async findOne(id: number, currentUser: User,): Promise<User> {
    if (Number(id) !== Number(currentUser.id) && currentUser.roles !== "ADMIN") {
      throw new HttpException('You do not have permission to view this user', HttpStatus.FORBIDDEN)
    }
    const getUser = await this.userRepository.findOne({ where: { id: id }});
    return (getUser)
  }

  async update(id: number, currentUser: any, body: any): Promise<User> {
    let user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User does not exist')
    }
    user = {...user, ...body}
    return await this.userRepository.save(user);
  }

}
