import { Body, Controller, Post } from '@nestjs/common'
import {
  articleBodyParams,
  articleDetailInfo,
  updateArticleInfo,
} from 'src/types/articleDetail'
import { ArticleDetailServices } from '../services/articleDetail.service'
import { BaseResponse } from 'src/utils/baseResponse'
import { BaseResponseCode } from '../constant/code'
import { HArticleDetails } from 'src/entity/article.entity'
import type { articleDetailsInfo } from '../types/articleDetail'

@Controller('article')
export class ArticleDetailControllers {
  constructor(private readonly ArticleDetailService: ArticleDetailServices) {}
  @Post('getArticleDetail')
  async getArticleDetail(
    @Body() data: articleBodyParams,
  ): Promise<BaseResponse<HArticleDetails[]>> {
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
}
