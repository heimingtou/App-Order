import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderAuditLogDto } from './create-order_audit_log.dto';

export class UpdateOrderAuditLogDto extends PartialType(CreateOrderAuditLogDto) {}
