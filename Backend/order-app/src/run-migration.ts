import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import {migrateBillIds} from './migrate-ulid' // Đường dẫn tới hàm migrate bạn viết

async function bootstrap() {
    // 1. Khởi tạo một instance ứng dụng NestJS ngầm (không cần mở cổng HTTP 3000)
    const app = await NestFactory.createApplicationContext(AppModule);

    // 2. Lấy ra DataSource của TypeORM từ container của NestJS
    const dataSource = app.get(DataSource);

    // 3. Gọi hàm migrate
    await migrateBillIds(dataSource) ;

    // 4. Đóng ứng dụng sau khi chạy xong
    await app.close();
    process.exit(0);
}

bootstrap();