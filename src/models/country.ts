import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

@Entity()
@ObjectType()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column({ length: 2, unique: true })
  @Field()
  code!: string

  @Column({ length: 50, unique: true })
  @Field()
  name!: string

  @Column({ length: 1, unique: true })
  @Field()
  emoji!: string

  @Column({ length: 2 })
  @Field()
  continent!: string
}

@InputType()
export class CountryCreateInput {
  @Field()
  code!: string

  @Field()
  name!: string

  @Field()
  continent!: string

  @Field()
  emoji!: string
}
