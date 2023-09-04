import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SalesOrderItemService } from './sales_order_item.service';
import { CreateSalesOrderItemDto } from './dto/create-sales_order_item.dto';
import { UpdateSalesOrderItemDto } from './dto/update-sales_order_item.dto';
import { GetUser } from 'src/auth/get-user.decorators';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('sales-order-item')
@UseGuards(AuthGuard())
export class SalesOrderItemController {
  constructor(private readonly salesOrderItemService: SalesOrderItemService) {}

  @Post()
  async create(@Body() createSalesOrderItemDto: CreateSalesOrderItemDto, @GetUser() user:User) {
    return await this.salesOrderItemService.create(createSalesOrderItemDto, user);
  }

  @Get()
  async findAll(@GetUser() user:User) {
    return await this.salesOrderItemService.findAll(user);
  }

  @Get(':id')
  async findOneItem(@Param('id') id: string, @GetUser() user:User ){
    return await this.salesOrderItemService.findOne(id,user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSalesOrderItemDto: UpdateSalesOrderItemDto) {
    return this.salesOrderItemService.update(+id, updateSalesOrderItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesOrderItemService.remove(+id);
  }
}