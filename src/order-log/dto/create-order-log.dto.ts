import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateOrderLogDto {
  @IsDate()
  time: Date;

  @IsNotEmpty()
  @IsString()
  description: string;
}
