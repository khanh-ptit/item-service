import { Transform, Type } from 'class-transformer';
import {
  Allow,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { REPLACE_PATTERN } from 'src/constant/common';
import { isJson } from 'src/helper/string.helper';
import { EnumSort } from 'src/utils/common';
import { BaseDto } from './base.dto';

export class Sort {
  @IsString()
  @IsNotEmpty()
  column: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(EnumSort)
  order: any;
}

export class Filter {
  @IsString()
  @IsNotEmpty()
  column: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
export class PaginationQuery extends BaseDto {
  KEYS = [];

  @Allow()
  @Transform((value) => {
    return Number(value.value) || 1;
  })
  page?: number;

  @Allow()
  @Transform((value) => {
    return Number(value.value) || 10;
  })
  limit?: number;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsArray()
  @Type(() => Filter)
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value;

    if (value) value = value.replace(REPLACE_PATTERN, '');

    // if (value) value = value.replace(/\\/g, '');
    if (isJson(value)) {
      const decodedData = decodeURIComponent(value);
      return JSON.parse(decodedData);
    }
  })
  filter?: Filter[];

  @Type(() => Sort)
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value;

    if (value) value = value.replace(REPLACE_PATTERN, '');

    // if (value) value = value.replace(/\\/g, '');

    if (isJson(value)) {
      const decodedData = decodeURIComponent(value);
      return JSON.parse(decodedData);
    }
  })
  sort?: Sort[];

  get take(): number {
    const limit = Number(this.limit) || 10;
    return limit > 0 && limit <= 1000 ? limit : 10;
  }

  get skip(): number {
    const page = (Number(this.page) || 1) - 1;
    return (page < 0 ? 0 : page) * this.take;
  }

  getTake(): number {
    const limit = Number(this.limit) || 10;
    return limit > 0 && limit <= 1000 ? limit : 10;
  }

  getSkip(): number {
    const page = (Number(this.page) || 1) - 1;
    return (page < 0 ? 0 : page) * this.take;
  }
}
