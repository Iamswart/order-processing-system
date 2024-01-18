import { IsInt, IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateOrderLogDto {
  @IsInt()
  orderId: number;

  @IsDate()
  time: Date;

  @IsNotEmpty()
  @IsString()
  description: string;
}
