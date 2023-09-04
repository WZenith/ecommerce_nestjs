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
    try{
      return await this.productRepository.save(createProductDto);
    }catch(error){
      if(error){
        throw new ConflictException("Product name already exists!");
      }
      else{
        throw new InternalServerErrorException();
      }
    }
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
