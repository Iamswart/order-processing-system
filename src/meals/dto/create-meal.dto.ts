import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
} from 'class-validator';

export class CreateMealDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  images?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  calories?: string;

  @IsOptional()
  @IsBoolean()
  isAddon?: boolean;

  @IsOptional()
  @IsBoolean()
  isCombo?: boolean;

  @IsOptional()
  @IsBoolean()
  alcohol?: boolean;

  @IsNotEmpty()
  @IsString()
  itemType: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mealTags?: string;

  @IsOptional()
  @IsNumber()
  minimumAge?: number;

  @IsOptional()
  @IsNumber()
  availableNo?: number;

  @IsOptional()
  @IsNumber()
  internalProfit?: number;
}
