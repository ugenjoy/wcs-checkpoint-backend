import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, InputType, ObjectType } from 'type-graphql'

@Entity()
@ObjectType()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number

  @Column({ length: 200, unique: true })
  @Field()
  name!: string

  @Column({ length: 2, unique: true })
  @Field()
  countryCode!: string

  @Column({ length: 2 })
  @Field()
  continentCode!: string

  @Column({ length: 1, unique: true })
  @Field()
  flagEmoji!: string
}

@InputType()
export class CountryCreateInput {
  @Field()
  name!: string

  @Field()
  countryCode!: string

  @Field()
  continentCode!: string

  @Field()
  flagEmoji!: string
}
