import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAddonDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  mealDataId?: number;

  @IsOptional()
  @IsNumber()
  internalProfit?: number;

  @IsNotEmpty()
  @IsNumber()
  minSelectionNo: number;
}
