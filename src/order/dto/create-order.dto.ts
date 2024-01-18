import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsJSON,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  userId: number;

  @IsBoolean()
  completed: boolean;

  @IsBoolean()
  cancelled: boolean;

  @IsBoolean()
  kitchenCancelled: boolean;

  @IsBoolean()
  kitchenAccepted: boolean;

  @IsBoolean()
  kitchenDispatched: boolean;

  @IsOptional()
  @IsDateString()
  kitchenDispatchedTime?: Date;

  @IsOptional()
  @IsDateString()
  completedTime?: Date;

  @IsOptional()
  @IsInt()
  riderId?: number;

  @IsBoolean()
  kitchenPrepared: boolean;

  @IsBoolean()
  riderAssigned: boolean;

  @IsBoolean()
  paid: boolean;

  @IsString()
  orderCode: string;

  @IsOptional()
  @IsString()
  orderChange?: string;

  @IsOptional()
  @IsInt()
  calculatedOrderId?: number;

  @IsDateString()
  createdAt: Date;

  @IsDateString()
  updatedAt: Date;

  @IsOptional()
  @IsDateString()
  kitchenVerifiedTime?: Date;

  @IsOptional()
  @IsDateString()
  kitchenCompletedTime?: Date;

  @IsBoolean()
  shopAccepted: boolean;

  @IsBoolean()
  shopPrepared: boolean;

  @IsInt()
  noOfMealbagsDelivered: number;

  @IsInt()
  noOfDrinksDelivered: number;

  @IsOptional()
  @IsDateString()
  riderStartedTime?: Date;

  @IsBoolean()
  riderStarted: boolean;

  @IsOptional()
  @IsDateString()
  riderArrivedTime?: Date;

  @IsBoolean()
  riderArrived: boolean;

  @IsBoolean()
  isFailedTrip: boolean;

  @IsOptional()
  @IsJSON()
  failedTripDetails?: object;

  @IsString()
  boxNumber: string;

  @IsOptional()
  @IsString()
  shelfId?: string;

  @IsOptional()
  @IsJSON()
  orderTotalAmountHistory?: Array<{ time: string; totalAmount: number }>;

  @IsBoolean()
  scheduled: boolean;

  @IsOptional()
  @IsInt()
  confirmedById?: number;

  @IsOptional()
  @IsInt()
  completedById?: number;

  @IsOptional()
  @IsDateString()
  scheduledDeliveryDate?: Date;

  @IsOptional()
  @IsDateString()
  scheduledDeliveryTime?: Date;

  @IsBoolean()
  isHidden: boolean;

  @IsOptional()
  @IsString()
  lat?: string;

  @IsOptional()
  @IsString()
  lng?: string;

  @IsBoolean()
  pickup: boolean;

  @IsOptional()
  @IsString()
  prevPrice?: string;

  @IsInt()
  orderTypeId: number;
}
