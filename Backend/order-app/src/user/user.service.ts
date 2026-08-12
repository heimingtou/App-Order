import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: { username: string; password: string }) {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại');
    }

    if (password !== user.pass) {
      throw new UnauthorizedException('pass error');
    }
    const payload = {
      uid: user.uid,
      username: user.username,
      role: user.role,
    };

    return {
      success: true,
      message: 'Đăng nhập thành công!',
      access_token: this.jwtService.sign(payload),
      info: payload,
    };
  }

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.username) {
      throw new BadRequestException({
        success: false,
        message: 'Thiếu thông tin username!',
      });
    }
    const exist = await this.userRepository.find({
      where: { username: createUserDto.username },
    });

    if (exist.length > 0) {
      throw new BadRequestException({
        success: false,
        message: 'Tài khoản đã tồn tại!',
      });
    }

    const newUser = this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email ?? '',
      role: 'customer',
      created_at: new Date(),
    });

    return this.userRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): { id: number } & UpdateUserDto {
    return { id, ...updateUserDto };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
