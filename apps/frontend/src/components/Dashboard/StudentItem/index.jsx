import PropTypes from 'prop-types'
import {useState} from 'react'
import {handleEditStudent} from '../functions'
import EditStudentModal from '../StudentModal/EditStudentModal'
import {convertTimeStamp} from '../../../common/helpers'

const StudentItem = ({student}) => {
  const [isEditStudentModalOpen, setIsEditStudentModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [updatedStudent, setUpdatedStudent] = useState({})

  const handleModal = (id) => {
    setIsEditStudentModalOpen(true)
    updatedStudent.id = id
  }

  const handleStudentEdit = (e) => {
    e.preventDefault()
    handleEditStudent({updatedStudent, setErrorMessage})
  }

  const handleOnChange = (e) => {
    setUpdatedStudent((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  return (
    <>
      <div className="border-b grid grid-cols-4 p-4 place-items-stretch">
        <div>
          <p className="font-bold text-sky-800 mb-4 text-lg">Full Name</p>
          <p>
            {student.first_name} {student.last_name}
          </p>
        </div>
        <div>
          <p className="font-bold text-sky-800 mb-4 text-lg">Email</p>
          <p>{student.email}</p>
        </div>
        <div>
          <p className="font-bold text-sky-800 mb-4 text-lg">Join Date</p>
          <p>{convertTimeStamp(student.created_at)}</p>
        </div>
        <button className="place-self-end" onClick={() => handleModal(student.id)}>
          <img src="/assets/icons/edit.svg" alt="edit student icon" width={40} height={40} />
        </button>
      </div>

      {isEditStudentModalOpen ? (
        <EditStudentModal
          errorMessage={errorMessage}
          setIsModalOpen={setIsEditStudentModalOpen}
          handleDone={handleStudentEdit}
          handleOnChange={handleOnChange}
        />
      ) : null}
    </>
  )
}

StudentItem.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }),
}
export default StudentItem
