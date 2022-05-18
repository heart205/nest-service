/**
 * @author heart
 * @description 通用接口
 * @Date 2022-05-18
 */

import { Body, Controller, Post } from '@nestjs/common'
import { BaseResponseCode } from 'src/constant/code'
import { BaseResponse } from 'src/utils/baseResponse'
import commonService from 'src/services/common.service'
import type { addressInfo, temperatureInterface } from 'src/types/utilsCommon'

@Controller('v1')
export class CommonController {
  constructor(private readonly commonServices: commonService) {}
  @Post('getLocationTemperature')
  async getLocationTemperature(
    @Body() params: addressInfo,
  ): Promise<BaseResponse<temperatureInterface>> {
    try {
      const data = await this.commonServices.getLocationTemperature(params)
      return new BaseResponse(BaseResponseCode.SUCCESS, '获取成功', data)
    } catch (e) {
      return new BaseResponse(BaseResponseCode.FAIL, 'error', e.message)
    }
  }
}
