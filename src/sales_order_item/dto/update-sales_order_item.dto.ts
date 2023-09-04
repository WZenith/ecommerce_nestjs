import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesOrderItemDto } from './create-sales_order_item.dto';

export class UpdateSalesOrderItemDto extends PartialType(CreateSalesOrderItemDto) {}
