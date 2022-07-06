/**
 * @author heart
 * @description 路由总表
 * @Date 2022-07-01
 */

import { Column, PrimaryGeneratedColumn } from 'typeorm'

export default class {
  @PrimaryGeneratedColumn()
  id: number

  // 表示暂存在哪个系统的路由
  @Column('varchar', { nullable: false, name: 'router_key' })
  routerKey: string

  @Column('varchar', { nullable: false, name: 'router_path' })
  routerPath: string

  @Column('int', { default: null, name: 'parent_id' })
  parentId: number
}
