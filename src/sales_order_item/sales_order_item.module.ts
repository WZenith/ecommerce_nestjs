import { Module } from '@nestjs/common';
import { SalesOrderItemService } from './sales_order_item.service';
import { SalesOrderItemController } from './sales_order_item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesOrderItem } from './entities/sales_order_item.entity';
import { Product } from 'src/products/entities/product.entity';

import { AuthModule } from 'src/auth/auth.module';
import { SalesOrder } from './entities/sales_order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalesOrderItem,Product,SalesOrder]),AuthModule],
  controllers: [SalesOrderItemController],
  providers: [SalesOrderItemService],
})
export class SalesOrderItemModule {}
