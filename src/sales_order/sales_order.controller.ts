import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SalesOrderService } from './sales_order.service';
import { CreateSalesOrderDto } from './dto/create-sales_order.dto';
import { UpdateSalesOrderDto } from './dto/update-sales_order.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorators';
import { SalesOrder } from './entities/sales_order.entity';

@Controller('sales-order')
@UseGuards(AuthGuard())
export class SalesOrderController {
  constructor(private readonly salesOrderService: SalesOrderService) {}

  @Post()
  async create(@Body() createSalesOrderDto: CreateSalesOrderDto, @GetUser() user:User) {
    return await this.salesOrderService.create(createSalesOrderDto,user);
  }

  @Get()
  async find(@GetUser() user:User):Promise<SalesOrder[]> {
    return await this.salesOrderService.find(user);
  }

  @Get(':id')
  findOne(@Param('id') sales_order_id: number,@GetUser() user:User) {
    return this.salesOrderService.findOne(sales_order_id,user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalesOrderDto: UpdateSalesOrderDto) {
    return this.salesOrderService.update(+id, updateSalesOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @GetUser() user:User) {
    return this.salesOrderService.remove(id,user);
  }
}
