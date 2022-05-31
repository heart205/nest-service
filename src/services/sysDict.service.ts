/**
 * @author heart
 * @description 字典表
 * @Date 2022-05-22
 */

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  dictionaryDetail,
  DictionaryInterface,
  SearchInterface,
} from '../types/dictionary'
import SysDict from '../entity/sysDict.entity'
import { Repository } from 'typeorm'
import { dateMergeTotal, mergeObj, pageNationMerge } from '../types/common'
import { BaseResponse } from '../utils/baseResponse'
import { BaseResponseCode } from '../constant/code'
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

  async editData(
    // 创建人id不可更改
    data: mergeObj<
      Pick<DictionaryInterface, Exclude<keyof DictionaryInterface, 'userId'>>,
      { id: number }
    >,
  ): Promise<BaseResponse<string | null>> {
    try {
      const { dictionaryCode, dictionaryName, describe, id } = data
      const val = await this.sysDict.update(
        { id },
        {
          code: dictionaryCode,
          name: dictionaryName,
          description: describe,
        },
      )
      console.log('edit dictionary data', val)
      if (val) {
        return new BaseResponse(BaseResponseCode.SUCCESS, '编辑成功')
      }
    } catch (e) {
      return new BaseResponse(BaseResponseCode.FAIL, '编辑失败', e.message)
    }
  }

  async searchData(
    data: pageNationMerge<SearchInterface>,
    isDelete = 0,
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
        where: { isDelete: isDelete },
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

  async searchDictionaryDetail(
    data: dictionaryDetail,
  ): Promise<BaseResponse<SysDict>> {
    try {
      const { id } = data
      const val = await this.sysDict.findOne({
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
        where: { id },
      })
      if (val && val.id) {
        return new BaseResponse(BaseResponseCode.SUCCESS, '查询成功', val)
      }
    } catch (e) {
      console.log('search dictionary error is :', e)
      return new BaseResponse(BaseResponseCode.FAIL, '查询失败', e.message)
    }
  }

  async deleteData(data: { id: number }): Promise<BaseResponse<string | null>> {
    try {
      const { id } = data
      const val = await this.sysDict.update({ id }, { isDelete: 1 })
      if (val) {
        return new BaseResponse(BaseResponseCode.SUCCESS, '删除成功')
      }
    } catch (e) {
      console.log('delete dictionary error is :', e)
      return new BaseResponse(BaseResponseCode.FAIL, '删除失败', e.message)
    }
  }
}
