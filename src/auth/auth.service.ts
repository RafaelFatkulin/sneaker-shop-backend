import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import { AuthUser } from './models/auth-user';
import { JwtPayload } from './models/jwt.payload';
import { UsersService } from '../users/users.service';
import { CreateUserRequest } from '../users/models/request/create-user.request';
import { SuccessMessageResponse } from '../common/models/response/success-message.response';
import { SigninRequest } from './models/requests/signin.request';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailSenderService: MailSenderService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  validateUser(payload: JwtPayload): Promise<AuthUser> {
    return this.prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
  }

  async signup(
    createUserRequest: CreateUserRequest,
  ): Promise<SuccessMessageResponse> {
    await this.usersService.addUser(createUserRequest);

    return {
      message: `Регистрация прошла успешно`,
    };
  }

  async signin(signinRequest: SigninRequest) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signinRequest.email,
      },
    });

    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }

    const isPasswordValid = await bcrypt.compare(
      signinRequest.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Неверный пароль');
    }

    const payload: JwtPayload = {
      id: user.id,
      username: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      role: user.role,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
