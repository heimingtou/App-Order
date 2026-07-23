import { Test, TestingModule } from '@nestjs/testing';
import { OrderAuditLogsService } from './order_audit_logs.service';

describe('OrderAuditLogsService', () => {
  let service: OrderAuditLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderAuditLogsService],
    }).compile();

    service = module.get<OrderAuditLogsService>(OrderAuditLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
