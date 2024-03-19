import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import { AuthUser } from './models/auth-user';
import { JwtPayload } from './models/jwt.payload';
import { SignupRequest } from './models/requests/signup.request';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    mailSenderService: MailSenderService
  ) {}

  async isEmailAvailable(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { email: true },
    });
    return user === null;
  }

  validateUser(payload: JwtPayload): Promise<AuthUser> {
    return this.prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
  }
  async signup(signupRequest: SignupRequest) {
    const emailVerificationToken = nanoid();

    if(!await this.isEmailAvailable(signupRequest.email)) {
      throw new ForbiddenException('Данный адрес электронной почты занят')
    }

    const user = await this.prisma.user.create({
      data: {
        name: signupRequest.name,
        email: signupRequest.email,
        passwordHash: await bcrypt.hash(signupRequest.password, 10),
        emailVerification: {
          create: {
            token: emailVerificationToken,
          },
        }
      }
    })
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
