import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    name!: string;

    @IsNumber()
    @IsPositive()
    price!: number;

    @IsString()
    description:string

    @IsNumber()
    quantity:number;
}
