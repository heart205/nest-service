import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class jueEntitys {
  @PrimaryGeneratedColumn()
  id: number

  @Column('int')
  aid: number

  @Column()
  uuid: string

  @Column('varchar', { length: 2000 })
  cookies: string
}
