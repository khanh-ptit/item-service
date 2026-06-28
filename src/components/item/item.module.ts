import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { CreateItemService } from './commands/create-item.service';
import { CreateItemValidator } from './validators/create-item.validator';
import { GetListItemService } from './commands/get-list-item.service';
import { GetDetailItemService } from './commands/get-detail-item.service';

@Module({
  controllers: [ItemController],
  providers: [
    ItemService,
    GetListItemService,
    GetDetailItemService,
    CreateItemService,
    CreateItemValidator,
  ],
})
export class ItemModule {}
