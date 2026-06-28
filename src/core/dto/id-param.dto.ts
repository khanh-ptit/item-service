import { BaseDto } from './base.dto';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class IdParamDto extends BaseDto {
  @Type(() => Number)
  @IsNumber()
  id: number;
}
