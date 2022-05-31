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
  responseArticleDetail,
} from '../types/articleDetail'
import { BaseResponse } from '../utils/baseResponse'
import { BaseResponseCode } from '../constant/code'
import { pageNationMerge } from '../types/common'
import { statusLength } from '../types/articleDetail'
@Injectable()
export class ArticleDetailServices {
  constructor(
    @InjectRepository(HArticleDetails)
    private readonly articleDetails: Repository<HArticleDetails>,
  ) {}

  async getArticleDetail(
    data: pageNationMerge<articleBodyParams>,
  ): Promise<BaseResponse<responseArticleDetail>> {
    try {
      const { status, userId, pageSize, offset } = data
      // 查询审核中 0 审核通过 1 审核不通过 -1 的总数量 不传查全部
      const [val, total] = await this.articleDetails.findAndCount({
        where: { userId: userId, status: status },
        take: pageSize || 10,
        skip: (offset - 1) * pageSize || 0,
      })
      if (val instanceof Array) {
        val.forEach((v) => {
          v.createTime = dayjs(v.createTime).format('YYYY-MM-DD HH:mm:ss')
          v.updateTime = dayjs(v.updateTime).format('YYYY-MM-DD HH:mm:ss')
        })
        return new BaseResponse(BaseResponseCode.SUCCESS, '查询成功', {
          data: val,
          total: total,
        })
      }
    } catch (e) {
      console.log('get article detail error is :', e)
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

  async getArticleDetailsInfo(
    data: articleDetailInfo,
  ): Promise<BaseResponse<HArticleDetails>> {
    try {
      const val = await this.articleDetails.findOne({
        where: { id: data.id },
      })
      // 是一个对象
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
      console.log('article data update info data value is :', data)
      const { id, title } = data
      if (title.trim() === '') {
        throw new Error('标题不能为空')
      }
      const val = await this.articleDetails.update({ id }, data)
      if (val) {
        return new BaseResponse(BaseResponseCode.SUCCESS, '更新成功')
      }
      return new BaseResponse(BaseResponseCode.FAIL, '更新失败')
    } catch (e) {
      console.log(e)
      return new BaseResponse(BaseResponseCode.FAIL, '更新失败', e.message)
    }
  }
  // 如何一次子查询查询3个结果
  getStatusNumber(id: number, status: number | string) {
    return new Promise(async (resolve, reject) => {
      try {
        ;(typeof status === 'string'
          ? this.articleDetails.countBy({
              userId: id,
            })
          : this.articleDetails.countBy({
              status,
              userId: id,
            })
        ).then((data) => {
          resolve(data)
        })
      } catch (e) {
        reject(e.message)
      }
    })
  }

  async getAllStatusNumbers(
    data: articleDetailInfo,
  ): Promise<BaseResponse<statusLength>> {
    return new Promise((resolve) => {
      try {
        const { id } = data
        const arr = [-1, 0, 1, '']
        Promise.all(
          arr.map((val) => {
            return this.getStatusNumber(id, val)
          }),
        ).then((res) => {
          console.log(res)
          const obj: statusLength = {
            examinationPassed: 0,
            underReview: 0,
            auditNotPassed: 0,
            total: 0,
          }
          res.forEach((val: number, index) => {
            switch (index) {
              case 0: {
                obj.auditNotPassed = val
                break
              }
              case 1: {
                obj.underReview = val
                break
              }
              case 2: {
                obj.examinationPassed = val
                break
              }
              default: {
                obj.total = val
              }
            }
          })
          resolve(new BaseResponse(BaseResponseCode.SUCCESS, '查询成功', obj))
        })
      } catch (e) {
        return Promise.reject(e.message)
      }
    })
  }
}
