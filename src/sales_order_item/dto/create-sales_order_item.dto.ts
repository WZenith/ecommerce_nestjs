import { IsNotEmpty, Min } from "class-validator";
export class CreateSalesOrderItemDto {
    // @IsNotEmpty()
    // salesOrderId:number;

    @IsNotEmpty()
    productId:number;

    @IsNotEmpty()
    @Min(1, { message: 'Quantity must be greater than 0' })
    quantity:number;
}
