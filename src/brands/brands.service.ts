import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import Brand from '../models/brand.model';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { isNameUnique } from '../common/validations/isUnique.validations';

@Injectable()
export class BrandsService {
  async createBrand(createBrandDto: CreateBrandDto) {
    if (!(await isNameUnique(Brand, createBrandDto.name))) {
      throw new BadRequestException('Brand name already exists');
    }
    return Brand.query().insert(createBrandDto);
  }

  async getAllBrands() {
    return Brand.query();
  }

  async getBrandById(id: number) {
    const brand = await Brand.query().findById(id);
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    return brand;
  }

  async updateBrandById(id: number, updateBrandDto: UpdateBrandDto) {
    const brand = await Brand.query().findById(id);
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    if (
      updateBrandDto.name &&
      !(await isNameUnique(Brand, updateBrandDto.name, id))
    ) {
      throw new BadRequestException('Brand name already exists');
    }

    return Brand.query().patchAndFetchById(id, updateBrandDto);
  }

  async deleteBrandById(id: number) {
    const brand = await Brand.query().findById(id);
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    await Brand.query().deleteById(id);
  }
}
