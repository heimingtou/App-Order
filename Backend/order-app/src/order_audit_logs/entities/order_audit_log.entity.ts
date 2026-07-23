import { Bill } from "src/bill/entities/bill.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'order_audit_logs' })
export class OrderAuditLog {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type:'int'})
    bill_id:number;

    @Column({type:'varchar', length: 50})
    action: string;

    @Column({type:'timestamp'})
    created_at:Date;

    @ManyToOne(()=>Bill, (bill)=>bill.orderauditlogs)
    @JoinColumn({ name:'bill_id' })
    bill:Bill
}
