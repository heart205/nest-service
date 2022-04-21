import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jueModule } from './juejing/jue.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '82.157.59.68',
      port: 3306,
      username: 'root',
      password: 'eMkd4Aw5sKeXhDy4',
      database: 'sign',
      // @see https://github.com/nestjs/nest/issues/4283
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      logging: false,
    }),
    jueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
