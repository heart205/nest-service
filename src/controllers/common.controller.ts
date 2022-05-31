/**
 * @author heart
 * @description 通用接口
 * @Date 2022-05-18
 */

import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { BaseResponseCode } from '../constant/code'
import { BaseResponse } from '../utils/baseResponse'
import commonService from '../services/common.service'
import type {
  addressInfo,
  magicSignParams,
  temperatureInterface,
} from '../types/utilsCommon'

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

  @Get('magicSign')
  async magicSignService(
    @Query() params: magicSignParams,
  ): Promise<BaseResponse<string>> {
    try {
      console.log(params)
      if (!params.id) throw new Error('id is null')
      console.log('params', params)
      const data = await this.commonServices.magicSign(params)
      if (data) {
        return new BaseResponse(BaseResponseCode.SUCCESS, '签到成功')
      }
      return new BaseResponse(BaseResponseCode.FAIL, '签到失败')
    } catch (e) {
      console.log('error', e)
      return new BaseResponse(BaseResponseCode.FAIL, 'error', e.message)
    }
  }
}
