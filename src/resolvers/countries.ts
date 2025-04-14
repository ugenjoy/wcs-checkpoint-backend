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
  async countriesByContinentCode(
    @Arg('continentCode', () => String) continentCode: string
  ): Promise<Country[]> {
    const countries = await Country.find({
      where: { continentCode },
    })
    return countries
  }

  @Query(() => Country)
  async countryByCountryCode(
    @Arg('countryCode', () => String) countryCode: string
  ): Promise<Country> {
    const country = await Country.findOne({
      where: { countryCode },
    })
    if (!country) {
      throw new Error('The given country code does not refer at any country')
    }
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
