import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class AddressDetailsDto {
  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  addressLine: string;

  @IsNotEmpty()
  buildingNumber: string;
}

class AddonDto {
  @IsNumber()
  addonId: number;
}

class MealDetailsDto {
  @IsNumber()
  mealId: number;

  @IsNumber()
  quantity: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddonDto)
  addons: AddonDto[];
}

export class CreateCalculatedOrderDto {
  @IsBoolean()
  freeDelivery: boolean;

  @IsNumber()
  deliveryFee: number;

  @IsNumber()
  serviceCharge: number;

  @IsObject()
  @ValidateNested()
  @Type(() => AddressDetailsDto)
  addressDetails: AddressDetailsDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MealDetailsDto)
  mealDetails: MealDetailsDto[];
}
