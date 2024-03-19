import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
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

  @IsNotEmpty()
  @IsEnum(Role)
  role: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(72)
  password: string;
}
