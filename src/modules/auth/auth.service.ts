import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
const bcrypt = require("bcryptjs");
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // Retrieves all Notes from the database using the authRepository.
  async login_1(requestBody:any): Promise<User> {
    let { password , email} = requestBody;
    const getUser = await this.authRepository.findOne({ where: { email: email }
     });
    const isMatch = await bcrypt.compare(password, getUser.password);
    if (!isMatch) {
      throw new NotFoundException('wrong password')
    }
    return (getUser)
  }
  // Saves a new Note to the database using the authRepository.
  async create(urequestBody:any): Promise<User> {
    let {password,name , email,roles } = urequestBody;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    let createUser = await this.authRepository.save({ password,name ,email,roles });
    return (createUser)
  }

}
