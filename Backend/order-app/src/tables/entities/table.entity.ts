import { Bill } from 'src/bill/entities/bill.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tables')
export class Table {
  @PrimaryGeneratedColumn()
  table_id!: number;

  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @ManyToMany(() => Bill, (bill) => bill.tables)
  orders!: Bill[];
}
