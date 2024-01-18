import { PartialType } from '@nestjs/mapped-types';
import { CreateCalculatedOrderDto } from './create-calculated-order.dto';

export class UpdateCalculatedOrderDto extends PartialType(
  CreateCalculatedOrderDto,
) {}
