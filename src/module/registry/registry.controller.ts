import { Body, Controller, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UserGuard } from '../../guard/user/user.guard';
import { User } from '../../decorator/user/user.decorator';
import { AddUserRequest } from '../../types/module/AddUserRequest';
import { RegistryService } from './registry.service';

@ApiBearerAuth()
@ApiTags('user')
@UseGuards(UserGuard)
@Controller('user')
export class RegistryController {
  constructor(private readonly userService: RegistryService) {}

  @Post('/createUser')
  async addUser(@Body() params: AddUserRequest): Promise<AddUserRequest> {
    this.userService.loginAuthentication(params);
    return await this.userService.addUser(params);
  }

  @User('admin')
  @Put('/updateUser')
  async updateUser(@Body() res: AddUserRequest) {
    return await this.userService.updateUserInfo(res.id, res);
  }
  @Delete('/deleteUser')
  async deleteUser(@Body() id: number) {
    return await this.userService.deleteUserInfo(id);
  }
}
