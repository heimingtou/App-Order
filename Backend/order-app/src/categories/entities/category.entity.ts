import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    idLoai: number;

    @Column({type: 'varchar', length:50})
    loai: string;

    @OneToMany(()=> Product, (product)=>product.idloai)
    @JoinColumn({name: 'idLoai'})
    product: Product[]

}
