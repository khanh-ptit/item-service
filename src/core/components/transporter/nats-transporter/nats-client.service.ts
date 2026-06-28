import { Inject, Injectable } from '@nestjs/common';
import { ClientNats } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NatsClientService {
  constructor(
    @Inject('NATS_CLIENT_SERVICE') private readonly natsClient: ClientNats,
  ) {}

  async send<T = any>(pattern: string, data: any): Promise<T> {
    const request = this.natsClient.send<T>(pattern, data);
    return await firstValueFrom(request);
  }
}
