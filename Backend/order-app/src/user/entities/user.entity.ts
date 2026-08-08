import { Bill } from 'src/bill/entities/bill.entity';
import { Entity } from 'typeorm';
import { Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  uid!: number;

  @Column({ length: 50, unique: true })
  username!: string;
  @Column({ length: 100 })
  email: string;

  @Column({ length: 255 })
  pass: string;

  @Column({ length: 20 })
  role: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Bill, (bill) => bill.user)
  bills!: Bill[];
}
