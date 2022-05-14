import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import type { ArticleDetail } from 'src/types/articleDetail'
import { HArticleDetails } from '../entity/article.entity'
import type { articleDetailsInfo } from '../types/articleDetail'
@Injectable()
export class ArticleDetailServices {
  constructor(
    @InjectRepository(HArticleDetails)
    private readonly articleDetails: Repository<HArticleDetails>,
  ) {}

  async getArticleDetail(id: number): Promise<ArticleDetail> {
    const data = await this.articleDetails.find({ where: { id } })
    console.log(data)
    return
  }

  async addArticleInfo(data: articleDetailsInfo): Promise<ArticleDetail> {
    // 返回的是当前存储的结果
    return await this.articleDetails.save(data)
  }
}
