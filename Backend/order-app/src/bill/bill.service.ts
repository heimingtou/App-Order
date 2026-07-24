import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In,Repository } from 'typeorm';
import { Bill } from './entities/bill.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createBillDto: CreateBillDto): Promise<Bill> 
  {
    const productIds = createBillDto.orderDetail.map(item => item.pr_id);

    // 2. Truy vấn database xem các pr_id này có tồn tại không
    const existingProducts = await this.productRepository.find({
      where: { pr_id: In(productIds) },
    });

    // 3. Nếu số lượng sản phẩm tìm thấy không khớp với số lượng pr_id gửi lên
    // nghĩa là có ít nhất một món ăn không tồn tại trong hệ thống
    if (existingProducts.length !== productIds.length) {
      throw new BadRequestException('Một hoặc nhiều món ăn (pr_id) không tồn tại trong hệ thống!');
    }
  
  const newBill = this.billRepository.create({
    uid: createBillDto.uid,
    orderDetail: createBillDto.orderDetail.map(item=>({
    pr_id: item.pr_id,
    sl: item.sl
    }))
   });
   return await this.billRepository.save(newBill);
  }

 async findAll():Promise<Bill[]> {
    return await this.billRepository.find({
      relations:{
      user: true,
      orderDetail:true,
      }
    }) ;
  }

  async findOne(id: number):Promise<Bill> {
    const bill= await this.billRepository.findOne({
      where: {bill_id:id},
      relations: {
        user: true, // lay kem thong tin user
        orderDetail:true, // lay kem danh sach mon an
      },
    });
    if(!bill){
      throw new NotFoundException('Khong tim thay hoa don')
    }
    return bill;
    
  }
  async findBillOfUser(uid: number): Promise<Bill[]>{
    const newBill= await this.billRepository.find({
      where: {uid:uid},
      relations: {
        user: true,
        orderDetail: true,
        orderauditlogs: true,
      },
    });
    if (!newBill || newBill.length===0)
    {
      throw new NotFoundException('Khong ton tai user')
    }
    return newBill;
  }

  async update(id: number, updateBillDto: UpdateBillDto): Promise<Bill> {
    const bill = await this.findOne(id)

    Object.assign(bill,updateBillDto)
    return await this.billRepository.save(bill);
  }

  async remove(id: number) {
    const bill= await this.findOne(id)

    await this.billRepository.remove(bill);
    return `This action removes a #${id} bill`;
  }
}
