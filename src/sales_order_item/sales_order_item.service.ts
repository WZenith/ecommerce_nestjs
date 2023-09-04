import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSalesOrderItemDto } from './dto/create-sales_order_item.dto';
import { UpdateSalesOrderItemDto } from './dto/update-sales_order_item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesOrderItem } from './entities/sales_order_item.entity';
import { EntityManager, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { SalesOrder } from 'src/sales_order/entities/sales_order.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class SalesOrderItemService {
  constructor(@InjectRepository(SalesOrderItem)
  private salesOrderItemRepository: Repository<SalesOrderItem>,
  @InjectRepository(Product)
  private productRepository: Repository<Product>,
  
  @InjectRepository(SalesOrder)
  private salesOrderRepository: Repository<SalesOrder>,
  
  private entityManager: EntityManager){
    
  }
  async create(createSalesOrderItemDto: CreateSalesOrderItemDto,user:User) {
    const {salesOrderId, productId, quantity} = createSalesOrderItemDto;
    const id = productId;
    const foundProduct = await this.productRepository.findOneBy({id});
    const sales_order_id = salesOrderId;
    const salesOrder = await this.salesOrderRepository.findOne({where:{sales_order_id}});

    const product = foundProduct;
    if(!foundProduct){
      throw new NotFoundException('Product not available in the store!');
    }
    if(!salesOrder){
      throw new NotFoundException( `Sales Order not found with the id:${sales_order_id}`)
    }
    const amount = foundProduct.price_in_rupees*quantity;
    const salesOrderItem = await this.salesOrderItemRepository.create({
      salesOrder,
      product,
      quantity,
      amount,
      user
    })
    
    try {
      await this.entityManager.save(salesOrderItem);
  } catch (error) {
      throw new InternalServerErrorException();
  }

  return salesOrderItem;
    
  }

  async find(user:User):Promise<SalesOrderItem[]> {
    const items = await this.salesOrderItemRepository.find({where:{user:{id:user.id}}})
    items.forEach(salesOrderItem=>{
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
