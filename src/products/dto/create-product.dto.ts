import { IsNotEmpty } from "class-validator";
import { ProductDto } from "./products.dto";

export class CreateProductDto {

    @IsNotEmpty()
    products: ProductDto[];
}
