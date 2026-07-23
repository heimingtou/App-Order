import { Injectable } from '@nestjs/common';
import { CreateOrderAuditLogDto } from './dto/create-order_audit_log.dto';
import { UpdateOrderAuditLogDto } from './dto/update-order_audit_log.dto';

@Injectable()
export class OrderAuditLogsService {
  create(createOrderAuditLogDto: CreateOrderAuditLogDto) {
    return 'This action adds a new orderAuditLog';
  }

  findAll() {
    return `This action returns all orderAuditLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderAuditLog`;
  }

  update(id: number, updateOrderAuditLogDto: UpdateOrderAuditLogDto) {
    return `This action updates a #${id} orderAuditLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderAuditLog`;
  }
}
