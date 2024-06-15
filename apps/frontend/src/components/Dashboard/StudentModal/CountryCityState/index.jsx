import PropTypes from 'prop-types'
import {useState} from 'react'
import {CitySelect, CountrySelect, StateSelect} from 'react-country-state-city'

const CountryCityState = ({setStudentData}) => {
  const [countryId, setCountryId] = useState(0)
  const [stateId, setStateId] = useState(0)

  return (
    <div>
      <CountrySelect
        onChange={(e) => {
          setCountryId(e.id)
          setStudentData((prev) => {
            return {...prev, country: e.name}
          })
        }}
        placeHolder="Select Country"
      />
      <StateSelect
        countryid={countryId}
        onChange={(e) => {
          setStateId(e.id)
        }}
        placeHolder="Select State"
      />
      <CitySelect
        countryid={countryId}
        stateid={stateId}
        placeHolder="Select City"
        onChange={(e) => {
          setStudentData((prev) => {
            return {...prev, city: e.name}
          })
        }}
      />
    </div>
  )
}

CountryCityState.propTypes = {
  setStudentData: PropTypes.func,
}

export default CountryCityState
