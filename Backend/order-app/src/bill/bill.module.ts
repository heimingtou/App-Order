import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { Product } from 'src/products/entities/product.entity';
import { EventsGateway } from 'src/socket';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, Product])],
  controllers: [BillController],
  providers: [BillService, EventsGateway],
})
export class BillModule {}
