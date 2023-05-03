import Lessons from './Lessons';
import { useEffect, useState } from 'react';
import { getLessons } from '../../Utils/lessonAPI';
import NewLesson from './NewLesson';

const Teacher = ({ setLesson }) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const [lessons, setLessons] = useState([]);

    const getLessonsHandler = async () => {
        const res = await getLessons(user.id)

        const data = res.lessons ? res.lessons : [];

        setLessons(data);
    }

    useEffect(() => {
        getLessonsHandler();
    }, [])

    return (
        <div className='main'>
            <h2>Teacher</h2>
            <h4>Welcome, {user.name}</h4>
            <Lessons lessons={lessons} setLesson={setLesson} />
            <NewLesson lessons={lessons} setLessons={setLessons} setLesson={setLesson} />
        </div>
    )
}

export default Teacher;