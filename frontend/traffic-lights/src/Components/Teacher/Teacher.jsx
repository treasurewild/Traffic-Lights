import Lessons from './Lessons';
import { useEffect, useState } from 'react';
import { getLessons } from '../../Utils/lessonAPI';
import NewLesson from './NewLesson';

const Teacher = ({ setLesson }) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const [lessons, setLessons] = useState([]);
    const [showAll, setShowAll] = useState(false);

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
            <Lessons lessons={lessons} getLessonsHandler={getLessonsHandler} showAll={showAll} setShowAll={setShowAll} setLesson={setLesson} />
            {(!showAll || lessons.length < 10) && <NewLesson lessons={lessons} setLessons={setLessons} setLesson={setLesson} />}
        </div>
    )
}

export default Teacher;