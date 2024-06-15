import {getCities, getCountries, getStates} from '../../../../common/functions'

export const fetchCountries = async (setCountries) => {
  try {
    const countriesData = await getCountries()
    countriesData?.length ? setCountries(countriesData) : setCountries([])
  } catch (e) {
    console.error('Failed to fetch countries:', e)
  }
}

export const fetchStates = async (selectedCountry, setStates) => {
  try {
    const statesData = await getStates(selectedCountry)
    statesData?.length ? setStates(statesData) : setStates([])
  } catch (e) {
    console.error('Failed to fetch states:', e)
  }
}

export const fetchCities = async (selectedState, setCities) => {
  try {
    const citiesData = await getCities(selectedState)
    citiesData?.length ? setCities(citiesData) : setCities([])
  } catch (e) {
    console.error('Failed to fetch cities:', e)
  }
}
