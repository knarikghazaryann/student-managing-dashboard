import {useEffect, useState} from 'react'
import {fetchCities, fetchCountries, fetchStates} from '../functions'
import PropTypes from 'prop-types'

const CountryCityState = ({handleOnChange}) => {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState('')
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')

  useEffect(() => {
    fetchCountries(setCountries)
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      fetchStates(selectedCountry, setStates)
    }
  }, [selectedCountry])

  useEffect(() => {
    if (selectedState) {
      fetchCities(selectedState, setCities)
    }
  }, [selectedState])

  const handleCountryChange = (e) => {
    handleOnChange(e)
    setSelectedCountry(e.target.value)
    setSelectedState('')
    setSelectedCity('')
  }

  const handleStateChange = (e) => {
    setSelectedState(e.target.value)
    setSelectedCity('')
  }

  const handleCityChange = (e) => {
    handleOnChange(e)
    setSelectedCity(e.target.value)
  }

  return (
    <>
      <select
        className="w-full text-gray-500 -ml-1 outline-none"
        onChange={handleCountryChange}
        value={selectedCountry}
        name="country">
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.country_name} value={country.country_name}>
            {country.country_name}
          </option>
        ))}
      </select>
      <select
        className="w-full text-gray-500 -ml-1 outline-none"
        onChange={handleStateChange}
        disabled={!selectedCountry}
        value={selectedState}
        name="state">
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state.state_name}>{state.state_name}</option>
        ))}
      </select>
      <select
        className="w-full text-gray-500 -ml-1 outline-none"
        onChange={handleCityChange}
        disabled={!selectedState}
        value={selectedCity}
        name="city">
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.city_name}>{city.city_name}</option>
        ))}
      </select>
    </>
  )
}

CountryCityState.propTypes = {
  handleOnChange: PropTypes.func,
}

export default CountryCityState
