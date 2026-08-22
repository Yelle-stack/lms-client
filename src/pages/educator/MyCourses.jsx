import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { useState } from 'react'

const MyCourses = () => {

  const {currency, allCourses} = useContext(AppContext)

  const [courses, setCourses] = useState(null)
  const fetchEducatorCourses = async () => {

    setCourses(allCourses)
  }

  return (
    <div>
      <h1>MyCourses page</h1>
    </div>
  )
}

export default MyCourses
