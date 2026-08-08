import { Injectable } from '@nestjs/common';
import { CreateOrderAuditLogDto } from './dto/create-order_audit_log.dto';
import { UpdateOrderAuditLogDto } from './dto/update-order_audit_log.dto';

@Injectable()
export class OrderAuditLogsService {
  create(createOrderAuditLogDto: CreateOrderAuditLogDto) {
    return createOrderAuditLogDto;
  }

  findAll() {
    return `This action returns all orderAuditLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderAuditLog`;
  }

  update(id: number, updateOrderAuditLogDto: UpdateOrderAuditLogDto) {
    return { id, ...updateOrderAuditLogDto };
  }

  remove(id: number) {
    return `This action removes a #${id} orderAuditLog`;
  }
}
