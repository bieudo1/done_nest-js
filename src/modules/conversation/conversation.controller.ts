import { Body, Controller, Get, Param, Post, Put, Render, Res, UseGuards } from "@nestjs/common";
import { ConversationService } from "./conversation.service";
import { AuthGuard } from "../guard/auth.guard";
import { CurrentUser } from "../decorators/current-user.decorator";
import { UserService } from "../user/user.service";


@Controller("conversation")
@UseGuards(AuthGuard)
export class ConversationController {
  constructor(
    private readonly conversationService: ConversationService,
    private readonly UserService: UserService,
  ) { }

  @Post()
  async create(@Body() payload: any,
  @CurrentUser() currentUser:any,
  ) {

    return this.conversationService.create(payload,currentUser);
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<void> {
    await this.conversationService.findById(id,['users']);
  }

  @Put(':id')
  async addUserstoConversation(
    @Param('id') id: number,
    @Body() user_id: any,
  ): Promise<void> {
    // const user = await this.UserService.getById(user_id)
    await this.conversationService.addUserstoConversation(id,user_id);
  }
 }