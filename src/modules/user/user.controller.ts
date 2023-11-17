import {
  Controller, Post, Body, Get,Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';
import { UserService } from './user.service';
import { AuthGuard } from '../guard/auth.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { RoleGuard } from '../guard/role.guard';

@Controller('user')
export class UserController {
  constructor(private readonly jwtService: JwtService,
    private readonly UserService: UserService,
  ) { }

  @Get()
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  async findAll(@Body() body: any) {
    return this.UserService.findAll();
 
  }

  @Put(':id')
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: number,
    @CurrentUser() currentUser,
    @Body() body: any
  ) {
    return this.UserService.update(id,currentUser,body);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(
    @Param('id') id: number,
    @CurrentUser() currentUser,
  ) {
    return await this.UserService.findOne(id,currentUser);
  }

}
