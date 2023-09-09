import { IsNotEmpty } from "class-validator";
import { CreateSalesOrderItemDto } from "./create-sales_order_item.dto";

export class CreateSalesOrderDto{
    @IsNotEmpty()
    ordered_Items: CreateSalesOrderItemDto[];
}
