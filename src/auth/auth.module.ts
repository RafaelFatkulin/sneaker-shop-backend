import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import config from '../config';
import { MailSenderModule } from '../mail-sender/mail-sender.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.jwt.secretOrKey,
      signOptions: {
        algorithm: 'HS256',
      },
    }),
    MailSenderModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService, UsersService],
})
export class AuthModule {}
