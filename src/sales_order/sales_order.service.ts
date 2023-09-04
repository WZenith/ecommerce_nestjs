import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSalesOrderDto } from './dto/create-sales_order.dto';
import { UpdateSalesOrderDto } from './dto/update-sales_order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesOrder } from './entities/sales_order.entity';
import { EntityManager, Not, Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { SalesOrderItem } from 'src/sales_order_item/entities/sales_order_item.entity';

@Injectable()
export class SalesOrderService {
  constructor(@InjectRepository(SalesOrder)
    private salesOrderRepository : Repository<SalesOrder>,
    private entitiyManager : EntityManager){

    }
  async create(createSalesOrderDto: CreateSalesOrderDto,user:User) {
    
    const salesOrder = await this.salesOrderRepository.create({
      user
    });
    await this.salesOrderRepository.save(salesOrder);
    return salesOrder;
  }

  async find(user:User):Promise<SalesOrder[]> {
    const salesOrder = await this.salesOrderRepository.find({where:{user:{id:user.id}}})
    return salesOrder;
  }

  async findOne(id: number,user:User) {
    const salesOrder = await this.salesOrderRepository.findOne({where:{sales_order_id:id,user:{id:user.id}}})
    if(!salesOrder){
      throw new NotFoundException(`The order is not found with id:${id}`)
    }
    return salesOrder;
  }

  update(id: number, updateSalesOrderDto: UpdateSalesOrderDto) {
    return `This action updates a #${id} salesOrder`;
  }

  async remove(id: number,user:User) {
    const salesOrder = await this.findOne(id,user);
    await this.salesOrderRepository.delete(salesOrder);
    return "Success!"
  }
}

