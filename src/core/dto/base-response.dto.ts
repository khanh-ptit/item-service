import { Expose } from 'class-transformer';

export class BaseResponseDto {
  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  deletedAt: Date;

  @Expose()
  createdBy: number;

  @Expose()
  deletedBy: number;
}
