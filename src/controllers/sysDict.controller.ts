/**
 * @author heart
 * @description 字典表
 * @Date 2022-05-22
 */

import { Body, Controller, Headers, Post } from '@nestjs/common'
import SysDict from 'src/entity/sysDict.entity'
import SysDictService from 'src/services/sysDict.service'
import { dateMergeTotal, pageNationMerge } from 'src/types/common'
import { DictionaryInterface, SearchInterface } from 'src/types/dictionary'
import { BaseResponse } from 'src/utils/baseResponse'

@Controller('sysDict')
export default class SysDictController {
  constructor(private readonly sysDictService: SysDictService) {}

  @Post('addData')
  addData(
    @Body() data: DictionaryInterface,
  ): Promise<BaseResponse<string | null>> {
    return this.sysDictService.addData(data)
  }

  @Post('searchDictionary')
  searchData(
    @Body() data: pageNationMerge<SearchInterface>,
  ): Promise<BaseResponse<dateMergeTotal<SysDict[]>>> {
    return this.sysDictService.searchData(data)
  }
}
