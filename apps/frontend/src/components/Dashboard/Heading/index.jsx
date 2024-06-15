import {useState} from 'react'
import StudentModal from '../StudentModal'
import {handleAddStudent, handleSearchStudent} from '../functions'
import PropTypes from 'prop-types'

const Heading = ({setStudents, setSearchNotFoundMessage}) => {
  const [studentData, setStudentData] = useState({})
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [searchValues, setSearchValues] = useState({})

  const handleCreateStudentClick = () => setIsAddStudentModalOpen(true)

  const handleCreateStudent = (e) => {
    e.preventDefault()
    handleAddStudent({setErrorMessage, studentData})
  }

  const handleOnChange = (e) => {
    setStudentData((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const handleSearchValue = (e) => {
    const searchValuesArr = e.target.value.split(' ')
    const [first_name, last_name] = searchValuesArr
    setSearchValues((prev) => {
      return {...prev, first_name, last_name}
    })
  }

  const handleSearchClick = async () => {
    try {
      const searchData = await handleSearchStudent({
        first_name: searchValues.first_name,
        last_name: searchValues.last_name,
        setSearchNotFoundMessage,
      })
      setStudents(searchData)
    } catch (e) {
      setStudents([])
      console.error(e)
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold text-4xl text-sky-800 pb-5">Student Dashboard</h1>
        <div>
          <button
            className="bg-sky-700 px-3 py-2 rounded-lg text-white hover:bg-sky-900"
            onClick={handleCreateStudentClick}>
            Add student
          </button>
          <input
            type="text"
            placeholder="Search student"
            className="bg-sky-100 outline-none ml-4 p-2 rounded-lg"
            onChange={handleSearchValue}
          />
          <button className="text-sky-800 ml-2" onClick={handleSearchClick}>
            search
          </button>
        </div>
      </div>
      {isAddStudentModalOpen ? (
        <StudentModal
          errorMessage={errorMessage}
          handleDone={handleCreateStudent}
          setIsModalOpen={setIsAddStudentModalOpen}
          handleOnChange={handleOnChange}
          setStudentData={setStudentData}
        />
      ) : null}
    </>
  )
}

Heading.propTypes = {
  setStudents: PropTypes.func.isRequired,
  setSearchNotFoundMessage: PropTypes.func.isRequired,
}

export default Heading
