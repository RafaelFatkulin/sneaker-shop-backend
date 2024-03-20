import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile, ParseFilePipe, MaxFileSizeValidator, UseGuards,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { CreateBrandRequest } from './models/request/create-brand.request';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from '../common/pipes/file-size-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guads/roles.guard';
import { AuthUser } from '../auth/models/auth-user';
import { User } from '../users/user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('logo'))
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({maxSize: 10 * 1024 * 1024})]
      })) file: Express.Multer.File,
    @Body() createBrandRequest: CreateBrandRequest
  ) {
    return this.brandsService.create({
      logo: file.filename,
      name: createBrandRequest.name,
      description: createBrandRequest.description,
    });
  }

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}
