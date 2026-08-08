import { Category } from 'src/categories/entities/category.entity';
import { Orderdetail } from 'src/orderdetail/entities/orderdetail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  pr_id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @Column({ type: 'boolean' })
  trang: boolean;

  @Column({ type: 'int' })
  idloai: number;

  @ManyToOne(() => Category, (category) => category.idLoai)
  @JoinColumn({ name: 'idloai' })
  category: Category;

  @OneToMany(() => Orderdetail, (orderdetail) => orderdetail.product)
  orderDetail: Orderdetail[];
}
