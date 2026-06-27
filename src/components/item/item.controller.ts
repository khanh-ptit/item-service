import { Body, Controller, Post } from '@nestjs/common';
import { CreateItemRequestDto } from './dto/request/create-item.request.dto';
import { CreateItemService } from './commands/create-item.service';

@Controller('')
export class ItemController {
  constructor(private readonly createItemService: CreateItemService) {}

  @Post()
  createItem(@Body() createItemRequestDto: CreateItemRequestDto) {
    console.log('🚀 [LOGGER] ~ createItemRequestDto:', createItemRequestDto);
    return this.createItemService.execute(createItemRequestDto);
  }
}
