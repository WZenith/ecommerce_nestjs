import { IsNotEmpty } from "class-validator";

export class ProductDto{

    @IsNotEmpty()
    product_name: string;

    @IsNotEmpty()
    price_in_rupees: number;
}