import { IsNotEmpty } from "class-validator";

export class CreateProductDto {

    @IsNotEmpty()
    product_name: string;

    @IsNotEmpty()
    price_in_rupees: number;
}
