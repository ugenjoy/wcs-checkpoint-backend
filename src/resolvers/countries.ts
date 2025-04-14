import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Country, CountryCreateInput } from '../models/country'

@Resolver()
export class CountriesResolver {
  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    const countries = await Country.find()
    return countries
  }

  @Query(() => [Country])
  async countriesByContinent(
    @Arg('continent', () => String) continent: string
  ): Promise<Country[]> {
    const countries = await Country.find({ where: { continent } })
    return countries
  }

  @Query(() => Country)
  async countryByCode(
    @Arg('code', () => String) code: string
  ): Promise<Country> {
    const country = await Country.findOne({
      where: { code },
    })

    if (!country) throw new Error('the given country does not exist')
    return country
  }

  @Mutation(() => Country)
  async createCountry(
    @Arg('data', () => CountryCreateInput) data: CountryCreateInput
  ): Promise<Country> {
    const newCountry = new Country()
    Object.assign(newCountry, data)

    const country = await Country.save(newCountry)
    return country
  }
}
