import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { BillModule } from './bill/bill.module';
import { CategoriesModule } from './categories/categories.module';
import { OrderdetailModule } from './orderdetail/orderdetail.module';
import { ProductsModule } from './products/products.module';
import { Bill } from './bill/entities/bill.entity';
import { Category } from './categories/entities/category.entity';
import { Orderdetail } from './orderdetail/entities/orderdetail.entity';
import { Product } from './products/entities/product.entity';
import { OrderAuditLogsModule } from './order_audit_logs/order_audit_logs.module';
import { OrderAuditLog } from './order_audit_logs/entities/order_audit_log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASS'),
        database: config.get<string>('DB_NAME'),
        entities: [User,Bill,Category,Orderdetail,Product, OrderAuditLog],
        synchronize: false,
      }),
    }),
    UserModule,
    BillModule,
    CategoriesModule,
    OrderdetailModule,
    ProductsModule,
    OrderAuditLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
