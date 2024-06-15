import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL

export const getCountries = async () => {
  try {
    const {data} = await axios.get(`${baseUrl}/countries`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_COUNTRY_TOKEN}`,
        Accept: 'application/json',
      },
    })

    return data
  } catch (error) {
    console.error('Error fetching countries:', error)
  }
}

export const getStates = async (country) => {
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/states/${country}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_COUNTRY_TOKEN}`,
        Accept: 'application/json',
      },
    })

    return data
  } catch (error) {
    console.error('Error fetching states:', error)
  }
}

export const getCities = async (state) => {
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/cities/${state}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_COUNTRY_TOKEN}`,
        Accept: 'application/json',
      },
    })

    return data
  } catch (error) {
    console.error('Error fetching cities:', error)
  }
}
