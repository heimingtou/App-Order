import { Bill } from 'src/bill/entities/bill.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('orderdetails')
export class Orderdetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  bill_id: number;

  @Column({ type: 'int' })
  pr_id: number;

  @Column({ type: 'int' })
  sl: number;

  @ManyToOne(() => Bill, (bill) => bill.bill_id)
  @JoinColumn({ name: 'bill_id' })
  bill: Bill;

  @ManyToOne(() => Product, (product) => product.pr_id)
  @JoinColumn({ name: 'pr_id' })
  product: Product;
}
