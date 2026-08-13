import { OrderAuditLog } from 'src/order_audit_logs/entities/order_audit_log.entity';
import { Orderdetail } from 'src/orderdetail/entities/orderdetail.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity('bills')
export class Bill {
  @PrimaryGeneratedColumn()
  bill_id!: string;
  
  @Column({ type: 'int' })
  uid!: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total!: number;

  @Column({ type: 'timestamp' })
  time!: Date;

  @Column({ type: 'boolean' })
  status!: boolean;

  @OneToMany(() => Orderdetail, (orderdetail) => orderdetail.bill, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  orderDetail: Orderdetail[];

  @ManyToOne(() => User, (user) => user.bills)
  @JoinColumn({ name: 'uid' })
  user!: User;

  @OneToMany(() => OrderAuditLog, (orderauditlogs) => orderauditlogs.bill)
  orderauditlogs: OrderAuditLog[];
}
