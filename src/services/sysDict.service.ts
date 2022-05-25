/**
 * @author heart
 * @description 字典表
 * @Date 2022-05-22
 */

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DictionaryInterface, SearchInterface } from 'src/types/dictionary'
import SysDict from 'src/entity/sysDict.entity'
import { Repository } from 'typeorm'
import { dateMergeTotal, pageNationMerge } from 'src/types/common'
import { BaseResponse } from 'src/utils/baseResponse'
import { BaseResponseCode } from 'src/constant/code'
@Injectable()
export default class SysDictService {
  constructor(
    @InjectRepository(SysDict)
    private readonly sysDict: Repository<SysDict>,
  ) {}
  async addData(
    data: DictionaryInterface,
  ): Promise<BaseResponse<string | null>> {
    const { dictionaryCode, dictionaryName, describe, userId } = data
    try {
      const val = await this.sysDict.insert({
        code: dictionaryCode,
        name: dictionaryName,
        description: describe,
        createUserId: Number(userId),
      })
      console.log('add Dictionary data', val)
      if (val) {
        return new BaseResponse(BaseResponseCode.SUCCESS, '添加成功')
      }
    } catch (e) {
      return new BaseResponse(BaseResponseCode.FAIL, '添加失败', e.message)
    }
  }

  async searchData(
    data: pageNationMerge<SearchInterface>,
  ): Promise<BaseResponse<dateMergeTotal<SysDict[]>>> {
    try {
      const { pageSize, offset } = data
      const [val, number] = await this.sysDict.findAndCount({
        select: [
          'id',
          'code',
          'name',
          'description',
          'status',
          'orderType',
          'createUserId',
          'createTime',
          'updateTime',
        ],
        take: pageSize || 10,
        skip: (offset - 1) * pageSize || 0,
      })
      console.log('search dictionary info', val, number)
      return new BaseResponse(BaseResponseCode.SUCCESS, '查询成功', {
        list: val,
        total: number,
      })
      // isDelete 不带出
    } catch (e) {
      console.log('search dictionary error is :', e)
      return new BaseResponse(BaseResponseCode.FAIL, '查询失败', e.message)
    }
  }
}
