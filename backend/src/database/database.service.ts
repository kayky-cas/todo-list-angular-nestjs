import { PrismaClient } from '@prisma/client';
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutDownHooks(app: INestApplication) {
    await this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
