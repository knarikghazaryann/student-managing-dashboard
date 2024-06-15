import {useEffect, useState} from 'react'
import {getAllStudents} from './functions'
import styles from './index.module.css'
import StudentItem from './StudentItem'
import Heading from './Heading'

const Dashboard = () => {
  const [students, setStudents] = useState([])
  const [searchNotFoundMessage, setSearchNotFoundMessage] = useState('')

  useEffect(() => {
    getAllStudents(setStudents)
  }, [])

  return (
    <section
      className={`p-10 shadow-2xl rounded-2xl bg-sky-50 overflow-auto m-10 ${styles.container}`}>
      <Heading setStudents={setStudents} setSearchNotFoundMessage={setSearchNotFoundMessage} />
      {students ? (
        students.map((student) => {
          return <StudentItem key={student.id} student={student} />
        })
      ) : (
        <p>{searchNotFoundMessage}</p>
      )}
    </section>
  )
}

export default Dashboard
