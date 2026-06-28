import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../../core/repository/base.repository';
import { Item } from '../entities/item.entity';
import { CreateItemRequestDto } from '../dto/request/create-item.request.dto';
import { isEmpty } from 'lodash';
import { PaginationQuery } from 'src/core/dto/pagination.query';

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

  async getList(request: PaginationQuery) {
    const { filter, sort, skip, take } = request;

    const queryBuilder = this.repository.createQueryBuilder('item');

    queryBuilder.addSelect('item.id');
    queryBuilder.addSelect('item.code');
    queryBuilder.addSelect('item.name');
    queryBuilder.addSelect('item.description');

    if (!isEmpty(filter) && filter) {
      filter.forEach((f) => {
        const filterKey = f.column;
        const filterValue = f.text;

        switch (filterKey) {
          case 'name':
            queryBuilder.andWhere(`item.name ILIKE :name`, {
              name: `%${filterValue}%`,
            });
            break;
          case 'code':
            queryBuilder.andWhere(`item.code = :code`, {
              code: `${filterValue}`,
            });
            break;
          case 'description':
            queryBuilder.andWhere(`item.description ILIKE :description`, {
              description: `%${filterValue}%`,
            });
            break;
        }
      });
    }

    // Sắp xếp
    if (!isEmpty(sort) && sort) {
      sort.forEach((s) => {
        const sortKey = s.column;
        const sortDirection = s.order; // 'ASC' | 'DESC'

        queryBuilder.addOrderBy(`item.${sortKey}`, sortDirection);
      });
    } else {
      queryBuilder.addOrderBy(`item.createdAt`, 'DESC');
    }

    queryBuilder.take(take);
    queryBuilder.skip(skip);

    const [docs, total] = await queryBuilder.getManyAndCount();

    return { docs, total };
  }
}
