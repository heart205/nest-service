import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleDetailControllers } from 'src/controllers/articleDetail.controller'
import { ArticleDetailServices } from 'src/services/articleDetail.service'
import { HArticleDetails } from '../entity/article.entity'
@Module({
  imports: [TypeOrmModule.forFeature([HArticleDetails])],
  controllers: [ArticleDetailControllers],
  providers: [ArticleDetailServices],
})
export class ArticleModule {}
