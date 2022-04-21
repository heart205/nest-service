import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jueServices } from './jue.service';
import { JueController } from './jue.controller';
import { jueEntitys } from 'src/entity/jue.entity';
@Module({
  imports: [TypeOrmModule.forFeature([jueEntitys])],
  controllers: [JueController],
  providers: [jueServices],
})
export class jueModule {}
