import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateBrandRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2048)
  @MinLength(48)
  description: string;

  @IsNotEmpty()
  @IsString()
  logo: string;
}
