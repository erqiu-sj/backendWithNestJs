import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../../constants';
import { AuthModule } from '../auth/auth.module';
import { Login } from '../../entity/login';

@Module({
  imports: [
    // PassportModule,
    // JwtModule.register({
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '60s' },
    // }),
    AuthModule,
    TypeOrmModule.forFeature([Login]),
  ],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
