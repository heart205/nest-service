import { Module } from '@nestjs/common'
import { CommonController } from '../controllers/common.controller'
import commonService from '../services/common.service'
import SysDictController from '../controllers/sysDict.controller'
import SysDictService from '../services/sysDict.service'
import SysDict from '../entity/sysDict.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import magicSignEntity from '../entity/magicSign.entity'
@Module({
  imports: [TypeOrmModule.forFeature([SysDict, magicSignEntity])],
  controllers: [CommonController, SysDictController],
  providers: [commonService, SysDictService],
  exports: [commonModule],
})
export default class commonModule {}
