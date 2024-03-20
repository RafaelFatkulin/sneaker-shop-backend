import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserRequest } from '../users/models/request/create-user.request';
import { SigninRequest } from './models/requests/signin.request';
import { SigninResponse } from '../users/models/response/signin.response';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService,) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUserRequest: CreateUserRequest) {
    return await this.authService.signup(createUserRequest);
  }

  @Post('signin')
  async signin(@Body() signinRequest: SigninRequest): Promise<SigninResponse> {
    return await this.authService.signin(signinRequest);
  }
}
