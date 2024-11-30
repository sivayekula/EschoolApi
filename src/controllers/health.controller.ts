import { Controller, Get } from "@nestjs/common";
import { HealthCheckService } from "@nestjs/terminus";
import { Public } from "./login.controller";

@Controller('health')
export class HealthController {
  constructor(private readonly health: HealthCheckService) {}
  @Public()
  @Get('')
  healthCheck() {
    return this.health.check([]);
  }
}