import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Bill } from './entities/bill.entity';
import { Product } from 'src/products/entities/product.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
    private dataSource:DataSource,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createBillDto: CreateBillDto): Promise<Bill> {
    const productIds = createBillDto.orderDetail.map((item) => item.pr_id);

    const existingProducts = await this.productRepository.find({
      where: { pr_id: In(productIds) },
    });

    if (existingProducts.length !== productIds.length) {
      throw new BadRequestException(
        'Một hoặc nhiều món ăn (pr_id) không tồn tại trong hệ thống!',
      );
    }

    const newBill = this.billRepository.create({
      uid: createBillDto.uid,
      status:false,
      orderDetail: createBillDto.orderDetail.map((item) => ({
        pr_id: item.pr_id,
        sl: item.sl,
      })),
    });

    return await this.billRepository.save(newBill);
  }

  async findAll(): Promise<Bill[]> {
    const rawResult = await this.dataSource.query('SELECT * FROM GET_ALL_BILL()');
    // Vì dùng 'SELECT * FROM function()', PostgreSQL sẽ trả về trực tiếp mảng các dòng (rows) 
    // chứ không bọc trong một object chứa tên hàm nữa.
    return rawResult || [];
  }

  async findOne(id: number): Promise<Bill> {
    const bill = await this.billRepository.findOne({
      where: { bill_id: id },
      relations: {
        user: true,
        orderDetail: true,
      },
    });

    if (!bill) {
      throw new NotFoundException('Khong tim thay hoa don');
    }

    return bill;
  }

  async findBillOfUser(uid: number): Promise<Bill[]> {
    const newBill = await this.billRepository.find({
      where: { uid: uid },
      relations: {
        user: true,
        orderDetail: true,
        orderauditlogs: true,
      },
    });

    if (!newBill || newBill.length === 0) {
      throw new NotFoundException('Khong ton tai user');
    }

    return newBill;
  }

  async update(id: number, updateBillDto: UpdateBillDto): Promise<Bill> {
    const bill = await this.findOne(id);

    Object.assign(bill, updateBillDto);
    return await this.billRepository.save(bill);
  }

  async updateStatus(id:number, status:boolean): Promise<Bill>{
    const bill = await this.findOne(id);
    if(!bill){
      throw new NotFoundException('bill is null')
    }
    Object.assign(bill, {status:status});
    return await this.billRepository.save(bill);
  }

  async remove(id: number) {
    const bill = await this.findOne(id);

    await this.billRepository.remove(bill);
    return `This action removes a #${id} bill`;
  }
}
