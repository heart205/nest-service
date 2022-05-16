import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class HArticleDetails {
  //PrimaryGeneratedColumn 主键自动生成的列
  @PrimaryGeneratedColumn()
  id: number

  @Column('int')
  userId: number

  @Column('text')
  content: string

  @Column()
  title: string

  @CreateDateColumn()
  createTime: Date | string

  @UpdateDateColumn()
  updateTime: Date | string
}
