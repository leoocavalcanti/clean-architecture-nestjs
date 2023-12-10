import { Injectable } from '@nestjs/common';
import { IEnvRepository } from './env-config.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService implements IEnvRepository {
  constructor(private configService: ConfigService) {}

  getAppPort(): number {
    return Number(this.configService.get<number>('PORT'));
  }
  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }
}
