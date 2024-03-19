import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { MailSenderModule } from '../mail-sender/mail-sender.module';
import { JwtModule } from '@nestjs/jwt';
import config from '../config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MailSenderModule,
    JwtModule.register({
      secret: config.jwt.secretOrKey,
      signOptions: {
        algorithm: 'HS256',
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, PrismaService, AuthService],
})
export class UsersModule {}
