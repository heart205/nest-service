import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import SysDict from './sysDict.entity'
@Entity('sys_dict_map')
export default class SysDictMapEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => SysDict, (sysDict) => sysDict.id)
  dictId: number

  @Column('varchar', { length: 255 })
  dictName: string

  @Column('varchar', { length: 255 })
  dictValue: number

  @Column('int', { default: 1 })
  status: number

  @CreateDateColumn()
  createTime: Date | string

  @UpdateDateColumn()
  updateTime: Date | string
}
