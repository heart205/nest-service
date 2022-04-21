/**
 * @author heart
 * @description 签到
 * @Date 2022-04-20
 */

import { Body, Controller, Get, Post } from '@nestjs/common';
import { jueServices } from './jue.service';
import type { addSignInfo, result, signInfo } from './jue.interface';
@Controller('jue')
export class JueController {
  constructor(private readonly jueService: jueServices) {}

  @Post('addSignInfo')
  async addSignInfo(@Body() body: addSignInfo): Promise<result> {
    return await this.jueService.addSignInfo(body);
  }

  @Post('sign')
  async dialySign(@Body() body: signInfo): Promise<result> {
    return await this.jueService.dialySign(body);
  }

  @Get('autoSign')
  async autoSign(): Promise<result> {
    return await this.jueService.autoSign();
  }
}
