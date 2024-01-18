import { Test, TestingModule } from '@nestjs/testing';
import { OrderTypesService } from './order-types.service';

describe('OrderTypesService', () => {
  let service: OrderTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderTypesService],
    }).compile();

    service = module.get<OrderTypesService>(OrderTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
