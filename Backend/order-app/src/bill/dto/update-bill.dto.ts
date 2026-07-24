import { PartialType } from '@nestjs/mapped-types';
import { CreateBillDto } from './create-bill.dto';
import { IsArray, IsNotEmpty, IsNumber, Validate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderdetailDto } from 'src/orderdetail/dto/create-orderdetail.dto';

export class UpdateBillDto extends PartialType(CreateBillDto) {

    @IsArray()
    @ValidateNested({each:true})
    @Type(()=> CreateOrderdetailDto)
    orderDetail: CreateOrderdetailDto[];
}
