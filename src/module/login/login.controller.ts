import { Controller, Get, Query, Put, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { LoginRequest } from '../../types/module/LoginRequest';

@Controller('login')
@ApiBearerAuth()
@ApiTags('Login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Get('/userLogin')
  async login(@Query() res: LoginRequest) {
    return await this.loginService.login(res);
  }
  @Put('/signOut')
  async signOut(@Body() id: number) {
    return await this.loginService.signOut(id);
  }
}
