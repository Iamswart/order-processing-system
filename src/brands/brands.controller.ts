import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Roles } from 'src/auth/decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guard';

@Controller('brands')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @Roles('ADMIN')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.createBrand(createBrandDto);
  }

  @Get()
  findAll() {
    return this.brandsService.getAllBrands();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.getBrandById(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.updateBrandById(+id, updateBrandDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.deleteBrandById(id);
  }
}
