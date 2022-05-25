/**
 * @author heart
 * @description 字典表
 * @Date 2022-05-22
 */

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import SysDictMap from './sysDictMap.entity'
@Entity('sys_dict')
export default class SysDict {
  @PrimaryGeneratedColumn()
  @OneToMany(() => SysDictMap, (sysDictMap) => sysDictMap.dictId)
  id: number

  @Column('varchar', { length: 255 })
  code: string

  @Column('varchar', { length: 255 })
  name: string

  @Column('varchar', { length: 255 })
  description: string

  @Column('int', { default: 0 })
  isDelete: number

  @Column('int', { default: 1 })
  status: number

  @Column('int', { default: 2 }) // 0 正序 1 倒序 2 不排序
  orderType: number

  @Column('int')
  createUserId: number

  @CreateDateColumn()
  createTime: Date | string

  @UpdateDateColumn()
  updateTime: Date | string
}
