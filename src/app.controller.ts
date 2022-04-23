import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    // configServices可以获取到环境变量的值
    const dbUser = this.configService.get<string>('DATABASE_USER');
    console.log(dbUser);
    return this.appService.getHello();
  }
}
