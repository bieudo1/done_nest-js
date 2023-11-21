import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
const bcrypt = require("bcryptjs");
import { JwtService } from '@nestjs/jwt';
import { access_token_private_key, access_token_public_key } from 'src/constraints/jwt.constraint';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async generateAccessToken(payload: any) {
    const private_key = access_token_private_key
    console.log(private_key) 
		return  this.jwtService.sign(payload, {
			algorithm: 'RS256',
			privateKey: private_key,
			expiresIn: '1h',
		});
	}
  // Retrieves all Notes from the database using the authRepository.
  async login(requestBody:any) {
    let { password , email} = requestBody;
    const getUser = await this.authRepository.findOne({ where: { email: email }
    });
    const isMatch = await bcrypt.compare(password, getUser.password);
    if (!isMatch) {
      throw new NotFoundException('wrong password')
    }
    const token = await this.generateAccessToken({getUser})
    return ({getUser,token})
  }
  // Saves a new Note to the database using the authRepository.
  async create(urequestBody:any): Promise<User> {
    let {password,name , email,roles } = urequestBody;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    let createUser = await this.authRepository.save({ password,name ,email,roles });
    return (createUser)
  }

  public async getUserFromAuthenticationToken(token: string) {
    const payload = this.jwtService.verify(token, {
      algorithms: ['RS256'],
			 publicKey:access_token_public_key,
    });
    if (payload.userId) {
      return this.userService.getById(payload.userId);
    }
  }

}
