import { Injectable } from '@nestjs/common';
import { CreateOrderdetailDto } from './dto/create-orderdetail.dto';
import { UpdateOrderdetailDto } from './dto/update-orderdetail.dto';

@Injectable()
export class OrderdetailService {
  create(createOrderdetailDto: CreateOrderdetailDto) {
    return createOrderdetailDto;
  }

  findAll() {
    return `This action returns all orderdetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderdetail`;
  }

  update(id: number, updateOrderdetailDto: UpdateOrderdetailDto) {
    return { id, ...updateOrderdetailDto };
  }

  remove(id: number) {
    return `This action removes a #${id} orderdetail`;
  }
}
