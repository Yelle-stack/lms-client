import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router'
import { useState } from 'react'

const Player = () => {

  const {enrolledCourses, calculateChapterTime} = useContext(AppContext)
  const {courseId} = useParams()
  const [courseData, setCourseData] = useState(null)

  const getCourseData = ()=> {
    enrolledCourses.map((course)=>{
      if(course._id === courseId){
        setCourseData(course)
      }
    })
  }

  return (
<>
    <div className='p-4 sm:p-10 flex flex-col-reverse md:grid-cols-2 gap-10 md:px-36'>
    {/* left column */}
     <div className='text-gray-800'>
      <h2 className='text-xl font-semibold'>Course Structure</h2>

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
                                        <p 
                                        onClick={()=> setPlayerData({
                                          videoId: lecture.lectureUrl.split('/').pop()
                                        })}
                                        className='text-blue-500 cursor-pointer'>
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

    {/* right column */}
     <div></div>

    </div>
</>
  )
}

export default Player
