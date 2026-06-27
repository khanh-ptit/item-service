import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { CreateItemService } from './commands/create-item.service';
import { CreateItemValidator } from './validators/create-item.validator';
import { ItemRepository } from './repository/item.repository';

@Module({
  controllers: [ItemController],
  providers: [
    ItemService,
    CreateItemService,
    CreateItemValidator,
    ItemRepository,
  ],
})
export class ItemModule {}
