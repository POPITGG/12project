
import axios from 'axios'
import { Country } from './types'

export const getCountries = async (): Promise<Country[]> => {
	const res = await axios.get('https://restcountries.com/v3.1/all?fields=name,region,flags')
  return res.data
}
