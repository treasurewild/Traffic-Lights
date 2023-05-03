import React from 'react';
import LessonSummary from './LessonSummary';

const Lessons = ({ lessons, setLesson }) => {

    const displayLessons = () => {
        if (lessons?.length > 0) {
            return lessons.map((lesson, index) => {
                return (
                    <div key={index}>
                        <LessonSummary lesson={lesson} setLesson={setLesson} />
                    </div>
                )
            });
        }

        return (<><p className='text-muted'>No lessons created.</p></>)
    }

    return (
        <>
            <h5>Recent Lessons</h5>
            <div className='d-flex flex-row flex-wrap'>
                {displayLessons()}
            </div>
        </>
    )
}

export default Lessons