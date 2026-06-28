import { Injectable } from '@nestjs/common';
import { ItemRepository } from '../repository/item.repository';
import { IdParamDto } from 'src/core/dto/id-param.dto';
import { isEmpty } from 'lodash';
import { BusinessException } from 'src/core/exception-filters/business-exception.filter';
import { I18nService } from 'nestjs-i18n';
import { UserService } from 'src/components/user-service/user.service';

@Injectable()
export class GetDetailItemService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly i18n: I18nService,
    private readonly userService: UserService,
  ) {}

  async execute(request: IdParamDto) {
    const item = await this.itemRepository.findOneById(request.id);

    if (isEmpty(item)) {
      throw new BusinessException(this.i18n.t('error.NOT_FOUND'));
    }

    if (item.createdBy) {
      const userId = item.createdBy;
      const user = await this.userService.getUserById(userId);
      item.createdBy = user as any;
    }

    return item;
  }
}
