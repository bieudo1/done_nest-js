import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
const bcrypt = require("bcryptjs");
import { JwtService } from '@nestjs/jwt';
const PRIVATE_KEY = process.env.PRIVATE_KEY;

@Injectable()
@UseInterceptors(ClassSerializerInterceptor)
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }
  
  async findAll(): Promise<User[]> {
    return await  this.userRepository.find();
  }

  async create(urequestBody:any) {
    let { password, name, email,  } = urequestBody;
    const salt = await bcrypt.genSalt(10);
    const roles= urequestBody.roles || 'USER'
    password = await bcrypt.hash(password, salt);
    let createUser = await this.userRepository.save({ password, name, email, roles});
    const token = this.jwtService.sign({ name, email, roles}, { secret: PRIVATE_KEY });
    return ({createUser,token})
  }

  async findOne(id: number, currentUser: User,): Promise<User> {
    if (Number(id) !== Number(currentUser.id)) {
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
