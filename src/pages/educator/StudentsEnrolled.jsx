import React, { useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'
import { useEffect } from 'react'
import Loading from '../../components/student/Loading'

const StudentsEnrollrd = () => {

  const [enrolledStudents, setEnrolledStudents] = useState(null)

  const fetchEnrolledStudents = async () => {
    setEnrolledStudents(dummyStudentEnrolled)
  }
  
  useEffect(() => {
    fetchEnrolledStudents()
  }, [])

  return enrolledStudents ? (
    <div>
      <div>
        
      </div>
    </div>
  ) : <Loading />
}

export default StudentsEnrollrd
