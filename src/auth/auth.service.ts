import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import { AuthUser } from './models/auth-user';
import { JwtPayload } from './models/jwt.payload';
import { UsersService } from '../users/users.service';
import { CreateUserRequest } from '../users/models/request/create-user.request';
import { SuccessMessageResponse } from '../common/models/response/success-message.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailSenderService: MailSenderService,
    private readonly usersService: UsersService,
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
}
