import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class HArticleDetails {
  @PrimaryGeneratedColumn()
  id: number

  @Column('int')
  userId: number

  @Column('text')
  content: string

  @Column()
  title: string
}
