/**
 * @author heart
 * @description 字典表的映射类型
 * @Date 2022-05-22
 */

export interface SysDictMap {
  id: number
  dictId: number
  dictName: string
  dictValue: string
  createTime: Date | string
  updateTime: Date | string
  status: number
}
