import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('h_article_details')
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

  @Column('int', { default: 0 }) // 审核中 0 审核通过 1 审核不通过 -1
  status: number

  @CreateDateColumn()
  createTime: Date | string

  @UpdateDateColumn()
  updateTime: Date | string
}
