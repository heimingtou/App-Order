import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { CreateOrderdetailDto } from "src/orderdetail/dto/create-orderdetail.dto";

export class CreateBillDto {
    @IsNotEmpty()
    @IsNumber()
    uid:number

    @IsArray()
    @ValidateNested({each: true})
    @Type(()=> CreateOrderdetailDto)
    orderDetail!: CreateOrderdetailDto[];


}
