import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Lấy token từ header của request theo chuẩn Bearer Token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Không cho phép token đã hết hạn
      secretOrKey: 'CHUOI_BI_MAT_CUA_BAN_O_DAY', // ⚠️ Phải trùng với secret key lúc bạn tạo token khi đăng nhập
    });
  }

  // Hàm này tự động chạy sau khi token được giải mã thành công
  validate(payload: { uid: number; username: string; role: string }) {
    // payload chính là dữ liệu bạn đã nhét vào token lúc đăng nhập (ví dụ: uid, username, role)
    // Giá trị trả về ở đây sẽ được NestJS tự động gán vào `request.user`
    return {
      userId: payload.uid,
      username: payload.username,
      role: payload.role,
    };
  }
}
