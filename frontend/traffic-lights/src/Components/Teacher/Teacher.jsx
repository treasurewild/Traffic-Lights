import Lessons from './Lessons';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getLessons } from '../../Utils/lessonAPI';
import NewLesson from './NewLesson';

const Teacher = ({ setLesson }) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const [lessons, setLessons] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [showCreateLesson, setShowCreateLesson] = useState(false);

    const getLessonsHandler = async () => {
        const res = await getLessons(user.id)

        const data = res.lessons ? res.lessons : [];

        setLessons(data);
    }

    useEffect(() => {
        getLessonsHandler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='main'>
            <h2>Teacher</h2>
            <h4>Welcome, {user.name}</h4>
            <Button variant='success' size='lg' onClick={() => setShowCreateLesson(!showCreateLesson)}>Create New Lesson</Button>
            {showCreateLesson && <NewLesson show={showCreateLesson} setShow={setShowCreateLesson} lessons={lessons} setLessons={setLessons} setLesson={setLesson} />}

            <Lessons lessons={lessons} getLessonsHandler={getLessonsHandler} showAll={showAll} setShowAll={setShowAll} setLesson={setLesson} />
        </div>
    )
}

export default Teacher;