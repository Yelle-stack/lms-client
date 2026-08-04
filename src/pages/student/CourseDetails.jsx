import { useParams } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'

const CourseDetails = () => {

  const { id } = useParams()

  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})

  const {
    allCourses,
    calculateRating,
    calculateChapterTime
  } = useContext(AppContext)

  const fetchCourseData = () => {
    const findCourse = allCourses.find(course => course._id === id)
    setCourseData(findCourse)
  }

  useEffect(() => {
    fetchCourseData()
  }, [allCourses, id])

  const toggleSection = (index)=> {
   setOpenSections((prev)=>(
    {...prev,
      [index]: !prev[index],
    }
   ))
  }

  return courseData ? (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-[120px] pt-10 pr-20 text-left'>

        {/* Background gradient */}
        <div className='absolute top-0 left-0 w-full h-section-height -z-10 bg-gradient-to-b from-cyan-100/70'></div>

        {/* LEFT COLUMN */}
        <div className='max-w-xl z-10 text-gray-500'>

          {/* Course title */}
          <h1 className='md:text-course-deatails-heading-large text-course-deatails-heading-small font-semibold text-gray-800'>
            {courseData.courseTitle}
          </h1>

          {/* Course description */}
          <p
            className='pt-4 md:text-base text-sm'
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200)
            }}
          ></p>

          {/* Review and ratings */}
          <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>

            <p>
              {calculateRating(courseData)}
            </p>

            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt=''
                  className='w-3 h-3.5'
                />
              ))}
            </div>

            <p className='text-blue-600'>
              ({courseData.courseRatings.length}{' '}
              {courseData.courseRatings.length > 1
                ? 'ratings'
                : 'rating'}
              )
            </p>

            <p>
              {courseData.enrolledStudents.length}{' '}
              {courseData.enrolledStudents.length > 1
                ? 'students'
                : 'student'}
            </p>

          </div>

          {/* Course author */}
          <p className='text-sm'>
            Course by{' '}
            <span className='text-blue-600 underline'>
              GreatStack
            </span>
          </p>

          {/* Course Structure */}
          <div className='pt-8 text-gray-800'>

            <h2 className='text-xl font-semibold'>
              Course Structure
            </h2>

            <div className='pt-5'>

              {courseData.courseContent.map((chapter, index) => (

                <div
                  key={index}
                  className='border border-gray-300 bg-white mb-2 rounded'
                >

                  {/* Chapter header */}
                  <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={()=> toggleSection(index)}>

                    <div className='flex items-center gap-2'>

                      <img
                        src={assets.down_arrow_icon}
                        alt='arrow icon'
                        className={`transform transition-transform ${openSections[index] ? 'rotate-180' : ''}`}
                      />

                      <p className='font-medium md:text-base text-sm'>
                        {chapter.chapterTitle}
                      </p>

                    </div>

                    <p className='text-sm md:text-default'>
                      {chapter.chapterContent.length} lectures -{' '}
                      {calculateChapterTime(chapter)}
                    </p>

                  </div>

                  {/* Lectures */}
                  <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0'}`}>

                    <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>

                      {chapter.chapterContent.map((lecture, i) => (

                        <li
                          key={i}
                          className='flex items-start gap-2 py-1'
                        >

                          {/* Lecture information */}
                          <div className='flex items-start gap-3'>

                            <img
                              src={assets.play_icon}
                              alt='play icon'
                              className='w-4 h-4 mt-1'
                            />

                            <div>

                              <p className='text-sm'>
                                {lecture.lectureTitle}
                              </p>

                              <div className='flex items-center gap-3 text-xs text-gray-500'>

                                {lecture.isPreviewFree && (
                                  <p className='text-blue-600 cursor-pointer'>
                                    Preview
                                  </p>
                                )}

                                <p>
                                  {humanizeDuration(
                                    lecture.lectureDuration * 60 * 1000,
                                    {
                                      units: ['h', 'm']
                                    }
                                  )}
                                </p>

                              </div>

                            </div>

                          </div>

                        </li>

                      ))}

                    </ul>

                  </div>

                </div>

              ))}

            </div>

          </div>

          <div className='py-20 text-sm md:text-default'>
            <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
             <p
            className='pt-3 rich-text'
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription
            }}
          ></p>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div>
          {/* Course image / purchase card will go here */}
        </div>

      </div>
    </>
  ) : (
    <Loading />
  )
}

export default CourseDetails
