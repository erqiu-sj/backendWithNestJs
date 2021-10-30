import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Registry } from '../../entity/registry';
import { AddUserRequest } from '../../types/module/AddUserRequest';
import { generateError, successfulResponse } from '../../utils';

@Injectable()
export class RegistryService {
  constructor(
    @InjectRepository(Registry)
    private readonly usersRepository: Repository<Registry>,
  ) {}

  /**
   * @description 创建一个用户
   * @param userInfo
   * @returns
   */

  async addUser(userInfo: AddUserRequest): Promise<AddUserRequest & Registry> {
    const existingUser = await this.usersRepository.findOne({
      where: { userName: userInfo.userName },
    });
    if (existingUser)
      generateError(
        { message: '用户已创建', result: null },
        HttpStatus.PRECONDITION_FAILED,
      );
    return await this.usersRepository.save(userInfo);
  }

  async updateUserInfo(id: number, info: AddUserRequest): Promise<void> {
    const result = await this.usersRepository.update(id, { ...info });
    // 影响了一行数据则表示成功
    if (result.affected === 1) {
      successfulResponse({ message: '修改成功', result: true });
    }
    generateError(
      { message: '修改失败，请重试', result: null },
      HttpStatus.PRECONDITION_FAILED,
    );
  }

  /**
   * @description 用户信息验证
   * @param param0
   * @returns
   */
  loginAuthentication({ userName, password, email }: AddUserRequest) {
    if (!password)
      generateError(
        { message: '密码不能为空', result: null },
        HttpStatus.PRECONDITION_FAILED,
      );
    if (!userName && !email)
      generateError(
        { message: '用户名或邮箱不能为空', result: null },
        HttpStatus.PRECONDITION_FAILED,
      );
  }

  async deleteUserInfo(id: number) {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 1) {
      successfulResponse({ message: '注销成功', result: true });
    }
    generateError(
      { message: '删除失败，请重试', result: null },
      HttpStatus.PRECONDITION_FAILED,
    );
  }
}
