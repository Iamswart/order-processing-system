import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
