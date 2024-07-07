import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ProductTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  languageCode: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  createdAt: string;
}
