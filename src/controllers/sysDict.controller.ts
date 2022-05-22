/**
 * @author heart
 * @description 字典表
 * @Date 2022-05-22
 */

import { Controller, Get } from '@nestjs/common'
import SysDictService from 'src/services/sysDict.service'

@Controller('sysDict')
export default class SysDictController {
  constructor(private readonly sysDictService: SysDictService) {}

  @Get('test')
  test() {
    return 'ok'
  }
}
