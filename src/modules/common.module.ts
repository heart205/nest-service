import { Module } from '@nestjs/common'
import { CommonController } from 'src/controllers/common.controller'
import commonService from 'src/services/common.service'
import SysDictController from 'src/controllers/sysDict.controller'
import SysDictService from 'src/services/sysDict.service'
import SysDict from 'src/entity/sysDict.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
@Module({
  imports: [TypeOrmModule.forFeature([SysDict])],
  controllers: [CommonController, SysDictController],
  providers: [commonService, SysDictService],
  exports: [commonModule],
})
export default class commonModule {}
