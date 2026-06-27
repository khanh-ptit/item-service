import { Injectable } from '@nestjs/common';
import { CreateItemRequestDto } from '../dto/request/create-item.request.dto';
import { ItemRepository } from '../repository/item.repository';
import { CreateItemValidator } from '../validators/create-item.validator';

@Injectable()
export class CreateItemService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly createItemValidator: CreateItemValidator,
  ) {}

  async execute(request: CreateItemRequestDto) {
    await this.createItemValidator.validate(request);

    const item = this.itemRepository.createEntity(request);
    console.log('🚀 [LOGGER] ~ item:', item);
    return await this.itemRepository.create(item);
  }
}
