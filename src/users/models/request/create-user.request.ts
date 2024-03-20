import {
  IsEmail,
  IsEnum,
  IsNotEmpty, IsOptional, IsPhoneNumber, IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export class CreateUserRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(8)
  name: string;

  @IsOptional()
  @IsEnum(Role)
  role?: "ADMIN" | "USER";

  @IsOptional()
  @IsPhoneNumber('RU')
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(72)
  password: string;
}
