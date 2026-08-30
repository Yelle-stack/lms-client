import React, { useEffect, useRef, useState } from 'react';
import uniqid from 'uniqid';
import Quill from 'quill';
import { assets } from '../../assets/assets';

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  });

  // Initialize Quill only once
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, []);

  // Chapter actions
  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter Name:');

      if (title && title.trim()) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title.trim(),
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length + 1,
        };

        setChapters((prevChapters) => [
          ...prevChapters,
          newChapter,
        ]);
      }
    }

    if (action === 'remove') {
      setChapters((prevChapters) =>
        prevChapters
          .filter((chapter) => chapter.chapterId !== chapterId)
          .map((chapter, index) => ({
            ...chapter,
            chapterOrder: index + 1,
          }))
      );
    }

    if (action === 'toggle') {
      setChapters((prevChapters) =>
        prevChapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? {
                ...chapter,
                collapsed: !chapter.collapsed,
              }
            : chapter
        )
      );
    }
  };

  // Lecture actions
  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    }

    if (action === 'remove') {
      setChapters((prevChapters) =>
        prevChapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            return {
              ...chapter,
              chapterContent: chapter.chapterContent.filter(
                (_, index) => index !== lectureIndex
              ),
            };
          }

          return chapter;
        })
      );
    }
  };

  // Add lecture to current chapter
  const addLecture = () => {
    if (!lectureDetails.lectureTitle.trim()) {
      alert('Please enter a lecture title.');
      return;
    }

    if (!lectureDetails.lectureDuration) {
      alert('Please enter the lecture duration.');
      return;
    }

    if (!lectureDetails.lectureUrl.trim()) {
      alert('Please enter the lecture URL.');
      return;
    }

    setChapters((prevChapters) =>
      prevChapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          return {
            ...chapter,
            chapterContent: [
              ...chapter.chapterContent,
              {
                lectureId: uniqid(),
                lectureTitle: lectureDetails.lectureTitle.trim(),
                lectureDuration: lectureDetails.lectureDuration,
                lectureUrl: lectureDetails.lectureUrl.trim(),
                isPreviewFree: lectureDetails.isPreviewFree,
              },
            ],
          };
        }

        return chapter;
      })
    );

    // Reset popup form
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });

    setCurrentChapterId(null);
    setShowPopup(false);
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
    setCurrentChapterId(null);

    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
    });
  };

  // Submit course
  const handleSubmit = (e) => {
    e.preventDefault();

    const courseDescription = quillRef.current
      ? quillRef.current.root.innerHTML
      : '';

    const courseData = {
      courseTitle,
      courseDescription,
      coursePrice,
      discount,
      image,
      chapters,
    };

    console.log('Course Data:', courseData);

    alert('Course data is ready!');
  };

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">

      <form onSubmit={handleSubmit}>

        {/* Course Title */}
        <div className="flex flex-col gap-1">
          <p>Course Title</p>

          <input
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-300 focus:border-blue-500"
            required
          />
        </div>

        {/* Course Description */}
        <div className="flex flex-col gap-1 mt-4">
          <p>Course Description</p>

          <div ref={editorRef}></div>
        </div>

        {/* Course Price + Thumbnail */}
        <div className="flex items-center justify-between flex-wrap w-full max-w-xl mt-4">

          {/* Course Price */}
          <div className="flex flex-col gap-1">
            <p>Course Price</p>

            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              type="number"
              placeholder="0"
              min={0}
              className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
              required
            />
          </div>

          {/* Course Thumbnail */}
          <div className="flex md:flex-row flex-col items-center gap-3">

            <p>Course Thumbnail</p>

            <label
              htmlFor="thumbnailImage"
              className="flex items-center gap-3 cursor-pointer"
            >

              <img
                src={assets.file_upload_icon}
                alt=""
                className="p-3 bg-blue-500 rounded"
              />

              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setImage(e.target.files[0]);
                  }
                }}
                accept="image/*"
                hidden
              />

              {image && (
                <img
                  className="max-h-10 max-w-20 object-contain"
                  src={URL.createObjectURL(image)}
                  alt="Course thumbnail"
                />
              )}

            </label>

          </div>

        </div>

        {/* Discount */}
        <div className="flex flex-col gap-1 mt-4">

          <p>Discount %</p>

          <input
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            type="number"
            placeholder="0"
            min={0}
            max={100}
            className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
            required
          />

        </div>

        {/* Adding Chapters & Lectures */}
        <div className="mt-8 w-full max-w-xl">

          {/* Chapters */}
          {chapters.map((chapter, chapterIndex) => (

            <div
              key={chapter.chapterId}
              className="bg-white border rounded-lg mb-4"
            >

              {/* Chapter Header */}
              <div className="flex justify-between items-center p-4 border-b">

                <div className="flex items-center">

                  <img
                    onClick={() =>
                      handleChapter('toggle', chapter.chapterId)
                    }
                    src={assets.dropdown_icon}
                    width={14}
                    alt=""
                    className={`mr-2 cursor-pointer transition-all ${
                      chapter.collapsed ? '-rotate-90' : ''
                    }`}
                  />

                  <span className="font-semibold">
                    {chapterIndex + 1} {chapter.chapterTitle}
                  </span>

                </div>

                <span className="text-gray-500">
                  {chapter.chapterContent.length} Lectures
                </span>

                <img
                  onClick={() =>
                    handleChapter('remove', chapter.chapterId)
                  }
                  src={assets.cross_icon}
                  alt=""
                  className="cursor-pointer"
                />

              </div>

              {/* Lectures */}
              {!chapter.collapsed && (

                <div className="p-4">

                  {chapter.chapterContent.map((lecture, lectureIndex) => (

                    <div
                      key={lecture.lectureId || lectureIndex}
                      className="flex justify-between items-center mb-2"
                    >

                      <span>

                        {lectureIndex + 1}{' '}
                        {lecture.lectureTitle}
                        {' - '}
                        {lecture.lectureDuration} mins
                        {' - '}

                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500"
                        >
                          Link
                        </a>

                        {' - '}

                        {lecture.isPreviewFree
                          ? 'Free Preview'
                          : 'Paid'}

                      </span>

                      <img
                        src={assets.cross_icon}
                        alt=""
                        onClick={() =>
                          handleLecture(
                            'remove',
                            chapter.chapterId,
                            lectureIndex
                          )
                        }
                        className="cursor-pointer"
                      />

                    </div>

                  ))}

                  {/* Add Lecture */}
                  <div
                    className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2"
                    onClick={() =>
                      handleLecture('add', chapter.chapterId)
                    }
                  >
                    + Add Lecture
                  </div>

                </div>

              )}

            </div>

          ))}

          {/* Add Chapter */}
          <div
            onClick={() => handleChapter('add')}
            className="flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer"
          >
            + Add Chapter
          </div>

        </div>

        {/* Add Course */}
        <button
          type="submit"
          className="bg-black text-white w-max py-2.5 px-8 rounded my-4"
        >
          ADD
        </button>

      </form>

      {/* Add Lecture Popup */}
      {showPopup && (

        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">

          <div className="bg-white text-gray-700 p-4 rounded relative w-full max-w-80">

            <h2 className="text-lg font-semibold mb-4">
              Add Lecture
            </h2>

            {/* Lecture Title */}
            <div className="mb-2">

              <p>Lecture Title</p>

              <input
                type="text"
                className="mt-1 block w-full border rounded py-1 px-2 outline-none focus:border-blue-500"
                value={lectureDetails.lectureTitle}
                onChange={(e) =>
                  setLectureDetails({
                    ...lectureDetails,
                    lectureTitle: e.target.value,
                  })
                }
              />

            </div>

            {/* Duration */}
            <div className="mb-2">

              <p>Duration (minutes)</p>

              <input
                type="number"
                min={1}
                className="mt-1 block w-full border rounded py-1 px-2 outline-none focus:border-blue-500"
                value={lectureDetails.lectureDuration}
                onChange={(e) =>
                  setLectureDetails({
                    ...lectureDetails,
                    lectureDuration: e.target.value,
                  })
                }
              />

            </div>

            {/* Lecture URL */}
            <div className="mb-2">

              <p>Lecture URL</p>

              <input
                type="url"
                className="mt-1 block w-full border rounded py-1 px-2 outline-none focus:border-blue-500"
                value={lectureDetails.lectureUrl}
                onChange={(e) =>
                  setLectureDetails({
                    ...lectureDetails,
                    lectureUrl: e.target.value,
                  })
                }
              />

            </div>

            {/* Preview */}
            <div className="flex gap-2 my-4">

              <p>Is Preview Free</p>

              <input
                type="checkbox"
                className="mt-1 scale-125"
                checked={lectureDetails.isPreviewFree}
                onChange={(e) =>
                  setLectureDetails({
                    ...lectureDetails,
                    isPreviewFree: e.target.checked,
                  })
                }
              />

            </div>

            {/* Add Lecture Button */}
            <button
              type="button"
              onClick={addLecture}
              className="w-full bg-blue-400 text-white px-4 py-2 rounded"
            >
              Add
            </button>

            {/* Close Popup */}
            <img
              onClick={closePopup}
              src={assets.cross_icon}
              className="absolute top-4 right-4 w-4 cursor-pointer"
              alt="Close"
            />

          </div>

        </div>

      )}

    </div>
  );
};

export default AddCourse;
