import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { useState } from 'react'
import { useEffect } from 'react'
import Loading from '../../components/student/Loading'

const MyCourses = () => {

  const {currency, allCourses} = useContext(AppContext)

  const [courses, setCourses] = useState(null)
  const fetchEducatorCourses = async () => {
    setCourses(allCourses)
  }

  useEffect(()=> {
    fetchEducatorCourses()
  }, [])

  return courses ? (
    <div className='h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='w-full'>
        <h2 className='pb-4 text-lg font-medium'>My Courses</h2>
      </div>
    </div>
  ) : <Loading />
}

export default MyCourses
