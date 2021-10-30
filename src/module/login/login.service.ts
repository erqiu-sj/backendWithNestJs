import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Login } from '../../entity/login';
import { Registry } from '../../entity/registry';
import { LoginRequest } from '../../types/module/LoginRequest';
import { generateError, successfulResponse } from '../../utils';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Login)
    private readonly loginRepository: Repository<Login>,
  ) {
    console.log(this.loginRepository);
  }
  async signOut(id: number) {
    const influenceUser = await getRepository(Registry).update(id, {
      isOnline: false,
    });
    if (influenceUser.affected === 1) {
      successfulResponse({ message: '退出成功', result: null });
    }
    generateError(
      { message: '退出登录失败,请重试', result: null },
      HttpStatus.PRECONDITION_FAILED,
    );
  }
  async login(params: LoginRequest) {
    const hasUser = await this.checkIfTheRegistryExists(params);
    if (hasUser) {
      await getRepository(Registry).update(hasUser.id, { isOnline: true });
      successfulResponse({ message: '登录成功', result: hasUser });
    } else
      generateError(
        { message: '登录失败,请先注册', result: null },
        HttpStatus.PRECONDITION_FAILED,
      );
  }

  private async checkIfTheRegistryExists(params: LoginRequest) {
    const result = await getRepository(Registry).findOne({
      where: [
        {
          userName: params.userName,
        },
        { email: params.userName },
      ],
    });
    return result;
  }
}
