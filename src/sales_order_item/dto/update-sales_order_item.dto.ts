import { PartialType } from '@nestjs/mapped-types';
import { CreateSalesOrderItemDto } from './create-sales_order_item.dto';
import { Min } from 'class-validator';


export class UpdateSalesOrderItemDto extends PartialType(CreateSalesOrderItemDto) {
    productId?: number;
    @Min(1, { message: 'Quantity must be greater than 0' })
    quantity: number;
}
