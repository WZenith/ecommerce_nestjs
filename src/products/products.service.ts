import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product)
   private productRepository: Repository<Product>,
   private entityManager: EntityManager){

  }

  async create(createProductDto: CreateProductDto) {
    const products = createProductDto.products;

    for(let i=0;i<products.length;i++){
      const product_name = products[i].product_name;
      const product = await this.productRepository.findOneBy({product_name});
      if(!product){
        await this.productRepository.save(products[i]);
      }
      else{
        throw new ConflictException(`Product already added with name ${product_name}!`);
      }
      
    }    
    return "Successfully added products!"
   
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    return await this.productRepository.findOneBy({id});
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const {product_name,price_in_rupees} = updateProductDto;

    const product = await this.findOne(id);

    if(!product){
      throw new NotFoundException(`The product is not found with the id:${id}`);
    }
    product.product_name = product_name;
    product.price_in_rupees = price_in_rupees;

    await this.entityManager.save(product);
    return product;    
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    if (!product){
      throw new NotFoundException(`The product is not found with the given id:${id}`);
    }
    await this.productRepository.delete(id);

    return "Successfully Deleted!"
  }
}
