import { Test, TestingModule } from '@nestjs/testing';
import { OrderAuditLogsController } from './order_audit_logs.controller';
import { OrderAuditLogsService } from './order_audit_logs.service';

describe('OrderAuditLogsController', () => {
  let controller: OrderAuditLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderAuditLogsController],
      providers: [OrderAuditLogsService],
    }).compile();

    controller = module.get<OrderAuditLogsController>(OrderAuditLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
