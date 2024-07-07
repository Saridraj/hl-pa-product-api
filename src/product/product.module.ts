import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entity/product.entity';
import { ProductTranslation } from '../entity/productTranslation.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductTranslationService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductTranslation])],
  providers: [ProductService, ProductTranslationService],
  controllers: [ProductController],
})
export class ProductModule {}
