import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
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
  async login_1(user: User): Promise<User> {
    let { publicKey, id } = user;
    const getUser = await this.authRepository.findOne({ where: { id: id } });
    const isMatch = await bcrypt.compare(publicKey,getUser.publicKey);
    // if (!isMatch) return { id: 0, publicKey: "sai" }
    return ({id,publicKey})
  }
  // Saves a new Note to the database using the authRepository.
  async create(user: User): Promise<User> {
    let { publicKey, id } = user;
    const salt = await bcrypt.genSalt(10);
    publicKey = await bcrypt.hash(publicKey, salt);
    let createUser = await this.authRepository.save({ publicKey, id });
    // console.log(createUser)
    let token = this.jwtService.sign(user);
    console.log(token)
    return ({id,publicKey})
  }

}
