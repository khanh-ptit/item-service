import { Injectable } from '@nestjs/common';
import { CreateItemRequestDto } from '../dto/request/create-item.request.dto';
import { ItemRepository } from '../repository/item.repository';
import { I18nService } from 'nestjs-i18n';
import { isEmpty } from 'lodash';
import { BusinessException } from 'src/core/exception-filters/business-exception.filter';
import { IdParamDto } from 'src/core/dto/id-param.dto';

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

    if (!isEmpty(existCode)) {
      throw new BusinessException(this.i18nService.t('error.CODE_EXIST'));
    }
  }

  async checkExistById(request: IdParamDto) {
    const existItem = await this.itemRepository.findByCondition({
      where: { id: request.id },
    });

    if (!isEmpty(existItem)) {
      throw new BusinessException(this.i18nService.t('error.NOT_FOUND'));
    }
  }
}
