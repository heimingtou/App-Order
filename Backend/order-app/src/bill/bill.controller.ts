import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGaurd } from 'src/role.guard';
import { Role } from 'src/role.decorator';

@Controller('bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Post()
  create(@Body() createBillDto: CreateBillDto) {
    return this.billService.create(createBillDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGaurd)
  @Role('admin')
  findAll() {
    return this.billService.findAll();
  }
  @Get('/id')
   @UseGuards(AuthGuard('jwt'), RolesGaurd)
  @Role('admin')
  GetIDBill(){
    return this.billService.getIdOfBill();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGaurd)
  @Role('admin')
  GetBillOfID(@Param('id') id: number){
    return this.billService.findBillOfId(id);

  }


  @Get('user/:uid')
  findBillOfUser(@Param('uid') uid: string) {
    return this.billService.findBillOfUser(+uid); // Dấu cộng (+) phía trước dùng để chuyển đổi kiểu string từ URL sang number
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    return this.billService.update(+id, updateBillDto);
  }

  
  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'), RolesGaurd)
  @Role('admin')
    async updateStatus(
    @Param('id',ParseIntPipe) id:number,
    @Body('status', ParseBoolPipe) status:boolean,
  )
{
    return await this.billService.updateStatus(id,status)
}
  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billService.remove(+id);
  }
}
