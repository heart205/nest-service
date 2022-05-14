import { Body, Controller, Post } from '@nestjs/common'
import { articleBodyParams } from 'src/types/articleDetail'
import { ArticleDetailServices } from '../services/articleDetail.service'
import type { articleDetailsInfo } from '../types/articleDetail'
@Controller('article')
export class ArticleDetailControllers {
  constructor(private readonly ArticleDetailService: ArticleDetailServices) {}
  @Post('getArticleDetail')
  async getArticleDetail(@Body() data: articleBodyParams): Promise<any> {
    await this.ArticleDetailService.getArticleDetail(data.id)
    return ''
  }

  @Post('addArticleInfo')
  // data接收的数据是经过处理好的
  async addArticleInfo(@Body() data: articleDetailsInfo): Promise<any> {
    const d = await this.ArticleDetailService.addArticleInfo(data)
    if (d.id) {
      return 'message'
    }
    return 'error'
  }
}
