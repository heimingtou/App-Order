import { Bill } from "src/bill/entities/bill.entity";
import { Entity } from "typeorm";
import { Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
@Entity({ name:'users'})
export class User {
@PrimaryGeneratedColumn()
  uid!: number;

  @Column({ length: 50, unique: true })
  username!: string;

  @OneToMany(()=>Bill,(bill)=>bill.user)
  bills!: Bill[];
}
