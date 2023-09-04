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

  async findAll(user:User) {
    const query = this.salesOrderItemRepository.createQueryBuilder('items');
    query.where({ user });
    const items = await query.getMany();

    return items;
  }

  async findOne(id: string,user:User) {
    const query = this.salesOrderItemRepository.createQueryBuilder('item');
    query.where({ id, user });
    const item = await query.getOne()

    if (item) {
      // console.log(tasks);
      return item;
    }
    else {
      throw new NotFoundException(`Cannot found! with the given id:${id}`);
    }
  }

  update(id: number, updateSalesOrderItemDto: UpdateSalesOrderItemDto) {
    return `This action updates a #${id} salesOrderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} salesOrderItem`;
  }
}
