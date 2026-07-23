import { Module } from '@nestjs/common';
import { OrderAuditLogsService } from './order_audit_logs.service';
import { OrderAuditLogsController } from './order_audit_logs.controller';

@Module({
  controllers: [OrderAuditLogsController],
  providers: [OrderAuditLogsService],
})
export class OrderAuditLogsModule {}
