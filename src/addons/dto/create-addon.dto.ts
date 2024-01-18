import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsNumber()
  mealDataId?: number;

  @IsOptional()
  @IsNumber()
  internalProfit?: number;

  @IsNotEmpty()
  @IsNumber()
  minSelectionNo: number;
}
