/**
 * @author heart
 * @description 字典表
 * @Date 2022-05-22
 */

import { Body, Controller, Post } from '@nestjs/common'
import SysDict from 'src/entity/sysDict.entity'
import SysDictService from 'src/services/sysDict.service'
import { dateMergeTotal, mergeObj, pageNationMerge } from 'src/types/common'
import {
  dictionaryDetail,
  DictionaryInterface,
  SearchInterface,
} from 'src/types/dictionary'
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

  @Post('searchDictionaryDetail')
  searchDictionaryDetail(
    @Body() data: dictionaryDetail,
  ): Promise<BaseResponse<SysDict>> {
    return this.sysDictService.searchDictionaryDetail(data)
  }

  @Post('editData')
  editData(
    @Body()
    data: mergeObj<
      Pick<DictionaryInterface, Exclude<keyof DictionaryInterface, 'userId'>>,
      { id: number }
    >,
  ): Promise<BaseResponse<string | null>> {
    return this.sysDictService.editData(data)
  }

  @Post('deleteData')
  deleteData(
    @Body() data: { id: number },
  ): Promise<BaseResponse<string | null>> {
    return this.sysDictService.deleteData(data)
  }
  // 回收站 查询 isDelete的结果为1的数据
}
