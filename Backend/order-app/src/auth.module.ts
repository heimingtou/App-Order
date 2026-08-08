import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy'; // 👈 Đường dẫn đến file jwt.strategy của bạn

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'CHUOI_BI_MAT_CUA_BAN_O_DAY',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtModule, JwtStrategy], // 👈 BẮT BUỘC PHẢI EXPORTS ĐỂ MODULE KHÁC DÙNG ĐƯỢC
})
export class AuthModule {}