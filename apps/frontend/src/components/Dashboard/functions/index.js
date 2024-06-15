import axios from 'axios'

const backUrl = process.env.REACT_APP_BACK_URL

export const getAllStudents = async (setStudents) => {
  try {
    const {data} = await axios.get(`${backUrl}/students`)
    setStudents(data)
  } catch (e) {
    console.error('Error getting student:', e)
  }
}

export const handleAddStudent = async ({setErrorMessage, studentData}) => {
  try {
    await axios.post(`${backUrl}/students`, studentData)
    window.location.reload()
  } catch (e) {
    setErrorMessage(e.response.data)
    console.error('Error creating student:', e)
  }
}

export const handleEditStudent = async ({updatedStudent, setErrorMessage}) => {
  const {id, first_name, last_name, email} = updatedStudent
  try {
    await axios.patch(`${backUrl}/students/${id}`, {
      first_name,
      last_name,
      email,
    })
    window.location.reload()
  } catch (e) {
    setErrorMessage(e.response.data)
    console.error('Error editing student:', e)
  }
}

export const handleSearchStudent = async ({first_name, last_name, setSearchNotFoundMessage}) => {
  try {
    const {data} = await axios.post(`${backUrl}/students/search`, {first_name, last_name})

    return data
  } catch (e) {
    setSearchNotFoundMessage(e.response.data)
    console.error('Error searching students', e)
  }
}
