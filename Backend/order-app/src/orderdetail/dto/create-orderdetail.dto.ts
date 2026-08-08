import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateOrderdetailDto {
  @IsNotEmpty()
  @IsNumber()
  pr_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive({ message: 'Số lượng phải lớn hơn 0' })
  sl: number;
}
