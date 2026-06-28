import { Injectable } from '@nestjs/common';
import { PaginationQuery } from 'src/core/dto/pagination.query';
import { ItemRepository } from '../repository/item.repository';
import { plainToInstance } from 'class-transformer';
import { GetListItemResponseDto } from '../dto/response/get-list-item.response.dto';

@Injectable()
export class GetListItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(query: PaginationQuery) {
    const { docs, total } = await this.itemRepository.getList(query);

    const returnData = plainToInstance(GetListItemResponseDto, docs, {
      excludeExtraneousValues: true,
    });

    return {
      items: returnData,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
      },
    };
  }
}
