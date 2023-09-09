import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SalesOrderItemService } from './sales_order_item.service';

import { UpdateSalesOrderItemDto } from './dto/update-sales_order_item.dto';
import { GetUser } from 'src/auth/get-user.decorators';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { SalesOrderItem } from './entities/sales_order_item.entity';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';


@Controller('/sales-order')
@UseGuards(AuthGuard())
export class SalesOrderItemController {
  constructor(private readonly salesOrderItemService: SalesOrderItemService) {}

  @Post('sales-order-item')
  async create(@Body() createSalesOrderDto: CreateSalesOrderDto, @GetUser() user:User){
    return await this.salesOrderItemService.create(createSalesOrderDto, user);
  }

  @Get()
  async findSalesOrderItem(@GetUser() user:User)  {
    return await this.salesOrderItemService.findSalesOrder(user);
  }

  @Get('sales-order-item')
  async find(@GetUser() user:User):Promise<SalesOrderItem[]>  {
    return await this.salesOrderItemService.find(user);
  }

  @Get('sales-order-item:id')
  async findOneItem(@Param('id') id: number, @GetUser() user:User ){
    return await this.salesOrderItemService.findOne(id,user);
  }

  @Patch('sales-order-item:id')
  update(@Param('id') id: string, @Body() updateSalesOrderItemDto: UpdateSalesOrderItemDto) {
    return this.salesOrderItemService.update(+id, updateSalesOrderItemDto);
  }

  @Delete('sales-order-item:id')
  remove(@Param('id') id: number,@GetUser() user:User) {
    return this.salesOrderItemService.remove(id,user);
  }
}
