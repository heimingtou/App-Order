import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, DataSource } from 'typeorm';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Bill } from './entities/bill.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
    private dataSource: DataSource,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createBillDto: CreateBillDto): Promise<Bill> {
    return await this.dataSource.transaction(async (manager) => {
      const productIds = createBillDto.orderDetail.map((item) => item.pr_id);
      const uniqueProductIds = Array.from(new Set(productIds));

      const existingProducts = await manager.find(Product, {
        where: { pr_id: In(uniqueProductIds) },
        lock: { mode: 'pessimistic_write' }, // Khóa row trong lúc transaction chạy
      });

      if (existingProducts.length !== uniqueProductIds.length) {
        throw new BadRequestException(
          'Một hoặc nhiều món ăn (pr_id) không tồn tại trong hệ thống!',
        );
      }
      const productMap = new Map(existingProducts.map((p) => [p.pr_id, p]));

      // 2. Check & trừ kho theo từng item trong orderDetail
      for (const item of createBillDto.orderDetail) {
        const product = productMap.get(item.pr_id);
        if (!product || product.quantity < item.sl) {
          throw new BadRequestException(
            `Món ăn ID ${item.pr_id} không đủ số lượng (Kho còn: ${product?.quantity ?? 0}, Đặt: ${item.sl})`,
          );
        }
        product.quantity -= item.sl;
        if (product.quantity == 0) {
          product.status = false;
        }
        await manager.save(Product, product);
      }

      const newBill = manager.create(Bill, {
        uid: createBillDto.uid,
        status: false,
        orderDetail: createBillDto.orderDetail.map((item) => ({
          pr_id: item.pr_id,
          sl: item.sl,
        })),
      });

      return await manager.save(Bill, newBill);
    });
  }

  async findAll(): Promise<Bill[]> {
    const rawResult = (await this.dataSource.query(
      'SELECT * FROM GET_ALL_BILL()',
    )) as unknown;
    return Array.isArray(rawResult) ? (rawResult as Bill[]) : [];
  }

  async findOne(id: string): Promise<Bill> {
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

  async findBillOfId(id: string): Promise<Bill[]> {
    try {
      const rawResult: unknown = await this.dataSource.query(
        'SELECT * FROM GET_ALL_BILL_ID($1::uuid)',
        [id],
      );

      return Array.isArray(rawResult) ? (rawResult as Bill[]) : [];
    } catch (error) {
      console.error('Lỗi khi gọi hàm GET_ALL_BILL_ID:', error);
      throw new Error('Không thể lấy thông tin hóa đơn');
    }
  }

  async getIdOfBill(): Promise<
    { id: string; status: boolean; time: Date; total: number }[]
  > {
    try {
      const query = `SELECT bill_id, status, time, total FROM bills ORDER BY time DESC`;
      const result: unknown = await this.dataSource.query(query);
      if (!Array.isArray(result)) {
        return [];
      }

      return result.map(
        (row: {
          bill_id: string;
          status: boolean;
          time: Date;
          total: number;
        }) => ({
          id: row.bill_id,
          status: row.status,
          time: row.time,
          total: row.total,
        }),
      );
    } catch (error) {
      console.error('Loi khi lay ds bill id', error);
      throw new Error('Khong the lay danh sach hoa don');
    }
  }

  async update(id: string, updateBillDto: UpdateBillDto): Promise<Bill> {
    const bill = await this.findOne(id);
    Object.assign(bill, updateBillDto);
    return await this.billRepository.save(bill);
  }

  async updateStatus(id: string, status: boolean): Promise<Bill> {
    try {
      const bill = await this.findOne(id);
      if (!bill) {
        throw new NotFoundException('bill is null');
      }
      Object.assign(bill, { status: status });
      return await this.billRepository.save(bill);
    } catch (error) {
      console.error('Loi khi updateStatus', error);
      throw new Error('Khong the update status');
    }
  }

  async remove(id: string) {
    const bill = await this.findOne(id);
    await this.billRepository.remove(bill);
    return `This action removes a #${id} bill`;
  }
}