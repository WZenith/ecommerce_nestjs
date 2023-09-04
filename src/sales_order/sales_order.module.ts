import { Module } from '@nestjs/common';
import { SalesOrderService } from './sales_order.service';
import { SalesOrderController } from './sales_order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesOrder } from './entities/sales_order.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([SalesOrder]),AuthModule],
  controllers: [SalesOrderController],
  providers: [SalesOrderService],
})
export class SalesOrderModule {}
