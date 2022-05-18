import { Module } from '@nestjs/common'
import { CommonController } from 'src/controllers/common.controller'
import commonService from 'src/services/common.service'
@Module({
  imports: [],
  controllers: [CommonController],
  providers: [commonService],
})
export default class commonModule {}
