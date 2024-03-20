import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import { CreateUserRequest } from './models/request/create-user.request';
import type { User } from '@prisma/client';
import { SuccessMessageResponse } from '../common/models/response/success-message.response';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailSenderService: MailSenderService,
  ) {}
  async isEmailAvailable(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { email: true },
    });
    return user === null;
  }
  async addUser(createUserRequest: CreateUserRequest): Promise<User> {
    const emailVerificationToken = uuidv4();

    if (!(await this.isEmailAvailable(createUserRequest.email))) {
      throw new ForbiddenException('Данный адрес электронной почты занят');
    }

    const user = this.prisma.user.create({
      data: {
        name: createUserRequest.name,
        email: createUserRequest.email,
        passwordHash: await bcrypt.hash(createUserRequest.password, 10),
        phone: createUserRequest.phone || null,
        address: createUserRequest.address || null,
        role: createUserRequest.role || 'USER',
        emailVerified: false,
        emailVerification: {
          create: {
            token: emailVerificationToken,
          },
        },
      },
    });

    if (!user) {
      throw new BadRequestException(
        'Произошла ошибка при регистрации пользователя',
      );
    }

    // Add mail here
    // ***

    return user;
  }

  async create(
    createUserRequest: CreateUserRequest,
  ): Promise<SuccessMessageResponse> {
    await this.addUser(createUserRequest);

    return {
      message: `Регистрация пользователя прошла успешно`,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
