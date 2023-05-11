import Delete from '../Page/Delete';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket';
import { getLesson, deleteLesson } from '../../Utils/lessonAPI';

const LessonSummary = ({ lesson, setLesson, getLessonsHandler }) => {
    const { learningObjective, classCode, subject, level, shortId, _id } = lesson;

    const navigate = useNavigate();

    const chooseLesson = async (e) => {
        e.preventDefault();

        const res = await getLesson(_id);

        if (res.status === 200) {
            setLesson(res.lesson);
            socket.emit('join', shortId);
            navigate(`/teacher/lesson/${shortId}`);
        }
    }

    const deleteLessonHandler = async () => {
        const res = await deleteLesson(_id);

        if (res.status === 200)
            getLessonsHandler();
    }

    return (
        <>
            <Card className="m-1 lesson">
                <Card.Header>
                    {subject && <p className='m-0'>Subject: <strong>{subject}</strong></p>}
                    {classCode && <p className='m-0'>Class: <strong>{classCode}</strong></p>}
                    {level && <p className='m-0'>Level: <strong>{level}</strong></p>}
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {learningObjective}
                    </Card.Text>
                    <Button variant='primary' size='sm' onClick={chooseLesson}>Go to Lesson</Button>
                    <Delete lessonId={_id} />
                </Card.Body>
            </Card>
        </>
    )
}

export default LessonSummary