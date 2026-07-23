import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderAuditLogsService } from './order_audit_logs.service';
import { CreateOrderAuditLogDto } from './dto/create-order_audit_log.dto';
import { UpdateOrderAuditLogDto } from './dto/update-order_audit_log.dto';

@Controller('order-audit-logs')
export class OrderAuditLogsController {
  constructor(private readonly orderAuditLogsService: OrderAuditLogsService) {}

  @Post()
  create(@Body() createOrderAuditLogDto: CreateOrderAuditLogDto) {
    return this.orderAuditLogsService.create(createOrderAuditLogDto);
  }

  @Get()
  findAll() {
    return this.orderAuditLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderAuditLogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderAuditLogDto: UpdateOrderAuditLogDto) {
    return this.orderAuditLogsService.update(+id, updateOrderAuditLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderAuditLogsService.remove(+id);
  }
}
