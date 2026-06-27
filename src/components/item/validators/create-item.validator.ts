import { Injectable } from '@nestjs/common';
import { CreateItemRequestDto } from '../dto/request/create-item.request.dto';
import { ItemRepository } from '../repository/item.repository';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class CreateItemValidator {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly i18nService: I18nService,
  ) {}

  async validate(request: CreateItemRequestDto) {
    const existCode = await this.itemRepository.findByCondition({
      where: { code: request?.code },
    });
  }
}
