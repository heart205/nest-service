import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { HArticleDetails } from '../entity/article.entity'
import * as dayjs from 'dayjs'
import type {
  articleDetailsInfo,
  articleBodyParams,
  articleDetailInfo,
  updateArticleInfo,
} from '../types/articleDetail'
import { BaseResponse } from 'src/utils/baseResponse'
import { BaseResponseCode } from 'src/constant/code'
@Injectable()
export class ArticleDetailServices {
  constructor(
    @InjectRepository(HArticleDetails)
    private readonly articleDetails: Repository<HArticleDetails>,
  ) {}

  async getArticleDetail(
    data: articleBodyParams,
  ): Promise<BaseResponse<HArticleDetails[]>> {
    try {
      const val = await this.articleDetails.find({
        where: { userId: data.userId },
      })
      if (val instanceof Array) {
        val.forEach((v) => {
          v.createTime = dayjs(v.createTime).format('YYYY-MM-DD HH:mm:ss')
          v.updateTime = dayjs(v.updateTime).format('YYYY-MM-DD HH:mm:ss')
        })
        return new BaseResponse(BaseResponseCode.SUCCESS, '查询成功', val)
      }
    } catch (e) {
      console.log(e)
      return new BaseResponse(BaseResponseCode.FAIL, '查询失败', e.message)
    }
  }

  async addArticleInfo(data: articleDetailsInfo): Promise<BaseResponse> {
    // 返回的是当前存储的结果
    try {
      if (!data.title) {
        throw new Error('标题不能为空')
      }
      const val = await this.articleDetails.save(data)
      if (val.id) {
        return new BaseResponse(BaseResponseCode.SUCCESS, '添加成功')
      }
    } catch (e) {
      return new BaseResponse(BaseResponseCode.FAIL, '添加失败', e.message)
    }
  }

  async getArticleDetailsInfo(data: articleDetailInfo) {
    try {
      const val = await this.articleDetails.findOne({
        where: { id: data.id },
      })
      // 是一个对象
      console.log(val)
      if (val) {
        return new BaseResponse(BaseResponseCode.SUCCESS, '查询成功', val)
      }
      return new BaseResponse(BaseResponseCode.SUCCESS, '查询数据有误', val)
    } catch (e) {
      console.log(e)
      return new BaseResponse(BaseResponseCode.FAIL, '查询失败', e.message)
    }
  }

  async updateArticleInfo(data: updateArticleInfo) {
    try {
      const val = await this.articleDetails.update({ id: data.id }, data)
      console.log('article data update info is', val)
      if (val) {
        return new BaseResponse(BaseResponseCode.SUCCESS, '更新成功')
      }
      return new BaseResponse(BaseResponseCode.FAIL, '更新失败')
    } catch (e) {
      console.log(e)
      return new BaseResponse(BaseResponseCode.FAIL, '更新失败', e.message)
    }
  }
}
