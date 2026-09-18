import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return { id, ...updateProductDto };
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
