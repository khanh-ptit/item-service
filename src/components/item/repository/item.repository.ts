import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repository/base.repository';
import { Item } from '../entities/item.entity';
import { CreateItemRequestDto } from '../dto/request/create-item.request.dto';
import { isEmpty } from 'lodash';

@Injectable()
export class ItemRepository extends BaseRepository<Item> {
  constructor(@InjectRepository(Item) repository: Repository<Item>) {
    super(repository);
  }

  createEntity(request: CreateItemRequestDto) {
    const item = new Item();
    item.code = request.code;
    item.name = request.name;
    if (!isEmpty(request.description)) {
      item.description = request.description;
    }
    return item;
  }
}
