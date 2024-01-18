import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMealDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @IsOptional()
  @IsNumber()
  amount?: number;

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

  @IsOptional()
  @IsString()
  itemType?: string;

  @IsOptional()
  mealTags?: string[];

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
