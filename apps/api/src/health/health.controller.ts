import { Controller, Get } from '@nestjs/common';
import { getHealth, HealthStatus } from './health.service';

@Controller('health')
export class HealthController {
  @Get()
  check(): HealthStatus {
    return getHealth();
  }
}
