import { Injectable } from '@nestjs/common';
import { MessageResponse } from './models/message.entity';

@Injectable()
export class AppService {
  getHello(): MessageResponse {
    return { message: 'To do backend!' };
  }
}
