import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private dataSource: DataSource) {}
  create(createProductDto: CreateProductDto) {
    return createProductDto;
  }

  async findAll(): Promise<unknown> {
    const rawResult = await this.dataSource.query(
      'SELECT get_full_menu_json()',
    );
    const result = Array.isArray(rawResult)
      ? (rawResult[0] as Record<string, unknown> | undefined)
      : undefined;
    const menu = result?.menu ?? result?.get_full_menu_json;
    return menu ?? null;
  }

  async findMenu(): Promise<{id: number,name:string, status: boolean}[]>{
    try{
      const query = 'SELECT pr_id,name,status from products'
      const rawResult= await this.dataSource.query(query);
      if(!Array.isArray(rawResult)){
        return[];
      }
      return rawResult.map((
        row:{
          pr_id:number,
          name: string,
          status:boolean,

        }
      )=>({
        id: row.pr_id,
        name: row.name,
        status:row.status,
      }),
    )
    }catch(error){
      console.error('loi khong lay duoc menu', error);
      throw new Error(' khong lay duoc menu');
    }
  }

  async findOne(id: number): Promise<{id:number, name: string, price: number, description: string, quantity: number }> {
    try{
      const query='SELECT pr_id, name, price, description,quantity FROM products WHERE pr_id=$1 '
      const rawResult= await this.dataSource.query(query,[id]);
      if(!Array.isArray(rawResult)|| rawResult.length===0){
        throw new NotFoundException('khong tim thay san pham');
      }
      const row= rawResult[0];
      return {
        id: row.pr_id,
        name: row.name,
        price: Number(row.price),
        description: row.description,
        quantity:Number(row.quantity)
      };
    }catch(error){
      if (error instanceof NotFoundException) throw error;
      console.error('Lỗi khi tìm sản phẩm:', error);
      throw new Error('Không thể lấy thông tin sản phẩm');
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try{
      const existing= await this.dataSource.query(
        'SELECT pr_id from products where pr_id=$1', [id]
      );
      if (!existing|| existing.length===0){
        throw new NotFoundException("khong tim thay san pham ID= ${id}")
      }
      const status=updateProductDto.quantity>0?true:false
      const query = `
                UPDATE products 
                SET name = COALESCE($1, name),
                    price = COALESCE($2, price),
                    description = COALESCE($3, description),
                    quantity = COALESCE($4, quantity),
                    status = $5
                WHERE pr_id = $6
                RETURNING pr_id as id, name, price, description, quantity, status;
            `;
            const result = await this.dataSource.query(query, [
                updateProductDto.name ?? null,
                updateProductDto.price ?? null,
                updateProductDto.description ?? null,
                updateProductDto.quantity ?? null,
                status,
                id,
            ]);
            return result[0];
    }catch(error){
      if (error instanceof NotFoundException) throw error;
            console.error('Lỗi khi update sản phẩm:', error);
            throw new Error('Không thể cập nhật sản phẩm');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
