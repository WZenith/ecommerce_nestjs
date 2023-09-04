import { Injectable } from '@nestjs/common';
import { CreateSalesOrderDto } from './dto/create-sales_order.dto';
import { UpdateSalesOrderDto } from './dto/update-sales_order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesOrder } from './entities/sales_order.entity';
import { EntityManager, Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

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

  async findAll(user:User) {
    const items = await this.salesOrderRepository.findOneBy({user});
    return items;

  }

  findOne(id: number) {
    return `This action returns a #${id} salesOrder`;
  }

  update(id: number, updateSalesOrderDto: UpdateSalesOrderDto) {
    return `This action updates a #${id} salesOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} salesOrder`;
  }
}
