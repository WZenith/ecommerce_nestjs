import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { Product } from './products/entities/product.entity';
import { SalesOrderItem } from './sales_order_item/entities/sales_order_item.entity';
import { SalesOrderItemModule } from './sales_order_item/sales_order_item.module';
import { SalesOrder } from './sales_order_item/entities/sales_order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'ecommerce_db',
      entities: [User,Product,SalesOrder,SalesOrderItem]
      ,
      synchronize: true,

    }),
    AuthModule,
    ProductsModule,
    SalesOrderItemModule,

  ],
  
})
export class AppModule {}
