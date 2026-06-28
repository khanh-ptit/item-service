import { BaseEntity } from 'src/database/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'items' })
export class Item extends BaseEntity {
  @Column({ nullable: false, length: 255 })
  name: string;

  @Column({ nullable: false, length: 255 })
  code: string;

  @Column({ nullable: true, type: 'text' })
  description: string;
}
