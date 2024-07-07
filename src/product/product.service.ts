import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { ProductTranslation } from '../entity/productTranslation.entity';
import { create } from 'domain';

@Injectable()
export class ProductTranslationService {
  constructor(
    @InjectRepository(ProductTranslation)
    private productTranslationRepository: Repository<ProductTranslation>,
  ) {}
  createProductTranslation(
    productId: number,
    languageCode: string,
    name: string,
    description: string,
  ) {
    const translation = {
      productId,
      languageCode,
      name,
      description,
      createdAt: Date(),
    };
    return this.productTranslationRepository.save(translation);
  }

  async searchByName(
    name: string,
    page: number,
    limit: number,
  ): Promise<[ProductTranslation[], number]> {
    const [result, total] =
      await this.productTranslationRepository.findAndCount({
        where: [{ name: name }],
        take: limit,
        skip: (page - 1) * limit,
      });
    console.log([result, total]);
    return [result, total];
  }
}

export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private readonly productTranslationService: ProductTranslationService,
  ) {}
  async createProduct(product: Product): Promise<Product> {
    const newProduct = {
      createdBy: product.createdBy,
      createdAt: Date(),
    };
    const translation = Object(product).translation;
    const res = await this.productRepository.save(newProduct);
    if (res) {
      for (let i = 0; i < translation.length; i++) {
        await this.productTranslationService.createProductTranslation(
          res.id,
          translation[i].languageCode,
          translation[i].name,
          translation[i].description,
        );
      }
    }
    return res;
  }

  async searchByName(name: string, page: number, limit: number) {
    return await this.productTranslationService.searchByName(name, page, limit);
  }
}
