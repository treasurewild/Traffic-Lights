import LessonSummary from './LessonSummary';
import { Button } from 'react-bootstrap';

const Lessons = ({ lessons, getLessonsHandler, setLesson, showAll, setShowAll }) => {

    const displayLessons = () => {
        if (lessons.length === 0)
            return (<><p className='text-muted'>No lessons created.</p></>)

        if (!showAll) {
            return lessons.slice(0, 10).map((lesson, index) => {
                return (
                    <div key={index}>
                        <LessonSummary getLessonsHandler={getLessonsHandler} lesson={lesson} setLesson={setLesson} />
                    </div>
                )
            });
        }
        else {
            return lessons.map((lesson, index) => {
                return (
                    <div key={index}>
                        <LessonSummary getLessonsHandler={getLessonsHandler} lesson={lesson} setLesson={setLesson} />
                    </div>
                )
            });
        }


    }

    return (
        <>
            <h5>Recent Lessons</h5>
            <Button size='sm' variant='secondary' onClick={() => setShowAll(!showAll)}>Show All</Button>
            <div className='d-flex flex-row flex-wrap'>
                {displayLessons()}
            </div>
        </>
    )
}

export default Lessons