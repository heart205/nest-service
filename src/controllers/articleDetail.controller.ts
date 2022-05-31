import { Body, Controller, Post } from '@nestjs/common'
import {
  articleBodyParams,
  articleDetailInfo,
  responseArticleDetail,
  updateArticleInfo,
} from '../types/articleDetail'
import { ArticleDetailServices } from '../services/articleDetail.service'
import { BaseResponse } from '../utils/baseResponse'
import { BaseResponseCode } from '../constant/code'
import type { articleDetailsInfo, statusLength } from '../types/articleDetail'
import type { pageNationMerge } from '../types/common'
@Controller('article')
export class ArticleDetailControllers {
  constructor(private readonly ArticleDetailService: ArticleDetailServices) {}
  @Post('getArticleDetail')
  async getArticleDetail(
    @Body() data: pageNationMerge<articleBodyParams>,
  ): Promise<BaseResponse<responseArticleDetail>> {
    return await this.ArticleDetailService.getArticleDetail(data)
  }

  @Post('addArticleInfo')
  // data接收的数据是经过处理好的
  async addArticleInfo(
    @Body() data: articleDetailsInfo,
  ): Promise<BaseResponse> {
    try {
      return await this.ArticleDetailService.addArticleInfo(data)
    } catch (e) {
      console.log('addArticleInfo', e)
      return new BaseResponse(BaseResponseCode.FAIL, '添加失败', e.message)
    }
  }

  @Post('getArticleDetailsInfo')
  async getArticleDetailsInfo(@Body() data: articleDetailInfo) {
    return await this.ArticleDetailService.getArticleDetailsInfo(data)
  }

  @Post('updateArticleInfo')
  async updateArticleInfo(@Body() data: updateArticleInfo) {
    return await this.ArticleDetailService.updateArticleInfo(data)
  }

  @Post('getAllStatusNumbers')
  async getAllStatusNumbers(
    @Body() data: articleDetailInfo,
  ): Promise<BaseResponse<statusLength>> {
    try {
      return await this.ArticleDetailService.getAllStatusNumbers(data)
    } catch (e) {
      return new BaseResponse(BaseResponseCode.SUCCESS, '查询失败', e.message)
    }
  }
}
