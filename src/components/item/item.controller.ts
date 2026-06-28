import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateItemRequestDto } from './dto/request/create-item.request.dto';
import { CreateItemService } from './commands/create-item.service';
import { PaginationQuery } from 'src/core/dto/pagination.query';
import { GetListItemService } from './commands/get-list-item.service';
import { GetDetailItemService } from './commands/get-detail-item.service';
import { IdParamDto } from 'src/core/dto/id-param.dto';

@Controller('')
export class ItemController {
  constructor(
    private readonly createItemService: CreateItemService,
    private readonly getListItemService: GetListItemService,
    private readonly getDetailItemService: GetDetailItemService,
  ) {}

  @Post()
  createItem(@Body() createItemRequestDto: CreateItemRequestDto) {
    return this.createItemService.execute(createItemRequestDto);
  }

  @Get()
  getList(@Query() query: PaginationQuery) {
    return this.getListItemService.execute(query);
  }

  @Get(':id')
  getDetail(@Param() request: IdParamDto) {
    return this.getDetailItemService.execute(request);
  }
}
