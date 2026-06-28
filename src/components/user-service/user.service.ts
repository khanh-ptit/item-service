import { Injectable } from '@nestjs/common';
import { NatsClientService } from 'src/core/components/transporter/nats-transporter/nats-client.service';
import { NatsService } from 'src/core/components/transporter/nats-transporter/nats.config';
import { NatsResponseInterface } from 'src/core/components/transporter/nats-transporter/nats.interface';

@Injectable()
export class UserService {
  constructor(private readonly natClientService: NatsClientService) {}

  async getUserById(id: number): Promise<NatsResponseInterface> {
    const res = await this.natClientService.send<{
      data: NatsResponseInterface;
    }>(`${NatsService.USER}.get_detail_by_ids`, {
      id,
    });

    return res.data;
  }
}
