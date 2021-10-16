import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessageResponse } from './models/message.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): MessageResponse {
    return this.appService.getHello();
  }
}
