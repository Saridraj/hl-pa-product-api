import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '../entity/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() product: Product): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @Get('search')
  async search(@Query('name') name: string,  @Query('page') page: number, @Query('limit') limit: number) {
    const [products, total] = await this.productService.searchByName(name, page, limit);
    return {
      data: products,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }



}

