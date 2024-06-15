import {editStudentModalConsts} from '../../consts'
import PropTypes from 'prop-types'

const EditStudentModal = ({errorMessage, setIsModalOpen, handleDone, handleOnChange}) => {
  const handleClose = () => setIsModalOpen(false)

  return (
    <div className="absolute h-screen left-0 top-0 w-full bg-neutral-600 bg-opacity-35">
      <form
        className="bg-white p-4 rounded-2xl shadow-2xl flex flex-col gap-5 top-[20%] absolute left-[35%] w-[500px]"
        autoComplete="off">
        <h2 className="text-xl font-semibold text-sky-800 text-center">Edit Student</h2>
        {editStudentModalConsts.map((item, index) => {
          return (
            <input
              key={index}
              type={item.type}
              name={item.name}
              placeholder={item.placeholder}
              className="border-b w-full outline-none"
              onChange={handleOnChange}
            />
          )
        })}
        <p>{errorMessage}</p>
        <div className="flex justify-between">
          <button onClick={handleClose} className="text-gray-600">
            Cancel
          </button>
          <button
            onClick={handleDone}
            className="bg-sky-700 text-white px-5 py-2 rounded-lg hover:bg-sky-950">
            Done
          </button>
        </div>
      </form>
    </div>
  )
}

EditStudentModal.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  handleDone: PropTypes.func.isRequired,
  handleOnChange: PropTypes.func.isRequired,
}

export default EditStudentModal
