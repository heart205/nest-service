import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { jueModule } from './modules/jue.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleModule } from './modules/articleDetail.module'
import commonModule from './modules/common.module'
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV || 'development'}.env`,
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'sign',
    //   // @see https://github.com/nestjs/nest/issues/4283
    //   entities: ['dist/**/*.entity.js'],
    //   synchronize: true,
    //   logging: false,
    // }),
    TypeOrmModule.forRootAsync({
      /**
       * @see: https://www.toimc.com/nestjs-example-project-5/
       * @see: https://blog.csdn.net/aminwangaa/article/details/123229306
       * @see: https://docs.nestjs.com/techniques/configuration
       * @see: https://stackoverflow.com/questions/59607560/nestjs-typeorm-configuration-works-but-not-with-configservice
       * @param config
       * @returns
       */
      useFactory: async (config: ConfigService) => {
        return {
          type: config.get('DATABASE_TYPE'),
          host: config.get('DATABASE_HOST'),
          port: config.get('DATABASE_PORT'),
          username: config.get('DATABASE_USER'),
          password: config.get('DATABASE_PASSWORD') as string,
          database: config.get('DATABASE') as any,
          // entities: ['dist/**/*.entity.js'],
          entities: ['./**/*.entity.js'],
          synchronize: true,
          logging: true,
          cache: false,
          maxQueryExecutionTime: 1000,
        }
      },
      inject: [ConfigService],
    }),
    jueModule,
    ArticleModule,
    commonModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
