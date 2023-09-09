import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { UpdateSalesOrderItemDto } from './dto/update-sales_order_item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesOrderItem } from './entities/sales_order_item.entity';
import { EntityManager, NoConnectionForRepositoryError, Not, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

import { User } from 'src/auth/user.entity';
import { SalesOrder } from './entities/sales_order.entity';
import { CreateSalesOrderDto } from './dto/create-sales-order.dto';


@Injectable()
export class SalesOrderItemService {
  constructor(@InjectRepository(SalesOrderItem)
  private salesOrderItemRepository: Repository<SalesOrderItem>,
  @InjectRepository(Product)
  private productRepository: Repository<Product>,
  
  @InjectRepository(SalesOrder)
  private salesOrderRepository: Repository<SalesOrder>,

  private entityManager: EntityManager,
  ){
    
  }
  async create(createSalesOrderDto: CreateSalesOrderDto,user:User) {
    const salesOrder = this.salesOrderRepository.create({user});
    salesOrder.grand_Total = 0;
    await this.salesOrderRepository.save(salesOrder);
    // Create an array to hold the order items
    const salesOrderItems = createSalesOrderDto.ordered_Items;     

    // Loop through the array of item DTOs and create order items
    for(let i= 0;i<salesOrderItems.length;i++){
      var id  = salesOrderItems[i].productId;
      var product = await this.productRepository.findOneBy({id});
      var quantity = salesOrderItems[i].quantity;
      var amount = quantity * product.price_in_rupees;
      var salesOrderItem = this.salesOrderItemRepository.create({
        salesOrder,
        product,
        quantity,
        amount,
        user
      });
      salesOrder.grand_Total=salesOrder.grand_Total+amount;
      await this.salesOrderItemRepository.save(salesOrderItem);      
      await this.salesOrderRepository.save(salesOrder);
    }

    return "Successfully ordered!";
    
  }

  async findSalesOrder(user:User){
    const salesOrder = await this.salesOrderRepository.find({where:{user:{id:user.id}}});
    salesOrder.forEach(salesOrder=>{
      delete salesOrder.user;
      salesOrder.salesOrderItem.forEach(item=>{
      
        delete item.user;
        delete item.salesOrder;
        delete item.product.createdAt;
        delete item.product.updatedAt;
        delete item.product.id;

      })
    })
    return salesOrder;
  }

  async find(user:User):Promise<SalesOrderItem[]> {
    const items = await this.salesOrderItemRepository.find({where:{user:{id:user.id}}});
    items.forEach(salesOrderItem=>{
      delete salesOrderItem.user;
      delete salesOrderItem.product.id;
      delete salesOrderItem.product.updatedAt;
      delete salesOrderItem.product.createdAt;
    });

    return items;
  }

  async findOne(id: number,user:User) {
    const salesOrderItem = await this.salesOrderItemRepository.findOne({where:{id:id,user:{id:user.id}}})

    if (salesOrderItem) {
      delete salesOrderItem.user.id;
      delete salesOrderItem.user.email;
      delete salesOrderItem.user.createdAt;
      delete salesOrderItem.user.updatedAt;
      delete salesOrderItem.user.password;
      delete salesOrderItem.salesOrder.user;
      delete salesOrderItem.salesOrder.sales_order_id;
      delete salesOrderItem.product.id;
      delete salesOrderItem.product.createdAt;
      delete salesOrderItem.product.updatedAt;
      return salesOrderItem;
    }
    else {
      throw new NotFoundException(`Cannot found! with the given id:${id}`);
    }
  }

  update(id: number, updateSalesOrderItemDto: UpdateSalesOrderItemDto) {
    return `This action updates a #${id} salesOrderItem`;
  }

  async remove(id: number, user:User) {
    const item = await this.findOne(id,user) ; 
    await this.salesOrderItemRepository.delete(item);
    return "Successfully Deleted !"

  }
}
