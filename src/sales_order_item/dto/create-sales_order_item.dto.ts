import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";

export class CreateSalesOrderItemDto {
    @IsNotEmpty()
    salesOrderId:number;

    @IsNotEmpty()
    productId:number;

    @IsNotEmpty()
    quantity:number;
}
