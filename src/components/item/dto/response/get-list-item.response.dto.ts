import { Expose } from 'class-transformer';
import { BaseResponseDto } from 'src/core/dto/base-response.dto';

export class GetListItemResponseDto extends BaseResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  description: string;
}
